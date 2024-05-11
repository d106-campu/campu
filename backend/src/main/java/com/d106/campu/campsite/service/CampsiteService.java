package com.d106.campu.campsite.service;

import com.d106.campu.auth.constant.RoleName;
import com.d106.campu.auth.exception.code.AuthExceptionCode;
import com.d106.campu.campsite.constant.CampsiteConstant;
import com.d106.campu.campsite.constant.IndutyEnum;
import com.d106.campu.campsite.constant.ThemeEnum;
import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.domain.jpa.CampsiteLike;
import com.d106.campu.campsite.domain.jpa.CampsiteLocation;
import com.d106.campu.campsite.dto.CampsiteDto;
import com.d106.campu.campsite.exception.code.CampsiteExceptionCode;
import com.d106.campu.campsite.mapper.CampsiteMapper;
import com.d106.campu.campsite.repository.jpa.CampsiteLikeRepository;
import com.d106.campu.campsite.repository.jpa.CampsiteRepository;
import com.d106.campu.campsite.repository.jpa.QCampsiteRepository;
import com.d106.campu.common.constant.DoNmEnum;
import com.d106.campu.common.constant.SigunguEnum;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.exception.UnauthorizedException;
import com.d106.campu.common.response.Response;
import com.d106.campu.common.util.SecurityHelper;
import com.d106.campu.reservation.repository.jpa.ReservationRepository;
import com.d106.campu.review.repository.jpa.ReviewRepository;
import com.d106.campu.room.domain.jpa.Room;
import com.d106.campu.room.dto.RoomDto;
import com.d106.campu.room.mapper.RoomMapper;
import com.d106.campu.room.repository.jpa.RoomRepository;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.exception.code.UserExceptionCode;
import com.d106.campu.user.repository.jpa.UserRepository;
import java.awt.geom.Point2D;
import java.time.LocalDate;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class CampsiteService {

    private final UserRepository userRepository;

    private final CampsiteRepository campsiteRepository;
    private final QCampsiteRepository qCampsiteRepository;
    private final CampsiteLikeRepository campsiteLikeRepository;
    private final CampsiteMapper campsiteMapper;

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    private final ReviewRepository reviewRepository;

    private final ReservationRepository reservationRepository;

    private final SecurityHelper securityHelper;

    /**
     * @param doNm      To limit location.
     * @param sigunguNm To limit location.
     * @param startDate To check reservation availability.
     * @param endDate   To check reservation availability.
     * @param headCnt   To filter available room.
     * @param induty    For campsites that has specific industry type. See {@link IndutyEnum}.
     * @param theme     For campsites that has specific theme. See {@link ThemeEnum}.
     * @param pageable
     * @return List of campsite.
     * @throws NotFoundException     If not login status.
     * @throws UnauthorizedException Only when `owner=true` option, if user does not have {@link RoleName#OWNER} role.
     */
    @Transactional(readOnly = true)
    public Response getCampsiteListResponse(
        DoNmEnum doNm,
        SigunguEnum sigunguNm,
        LocalDate startDate,
        LocalDate endDate,
        int headCnt,
        IndutyEnum induty,
        ThemeEnum theme,
        Pageable pageable,
        User user
    ) {
        String doNmStr = (doNm == null) ? null : doNm.getName();
        String sigunguNmStr = (sigunguNm == null) ? null : sigunguNm.getName();

        Page<Campsite> responsePage = null;
        if (induty == null && theme == null) {
            responsePage = campsiteRepository.findAll(pageable, doNmStr, sigunguNmStr, headCnt);
        } else if (induty != null) {
            responsePage = campsiteRepository.findByInduty(pageable, doNmStr, sigunguNmStr, induty.getName(), headCnt);
        } else if (theme != null) {
            responsePage = campsiteRepository.findByTheme(pageable, doNmStr, sigunguNmStr, theme.getName(), headCnt);
        }

        if (responsePage == null) {
            return null;
        }

        List<Long> campsiteIds = responsePage.stream().mapToLong(Campsite::getId).boxed().toList();
        Map<Long, Integer> minPriceByCampsiteMap = qCampsiteRepository.findCheapestRoomPriceByCampsite(campsiteIds, headCnt);
        Map<Long, Boolean> campsiteLikeByUserMap =
            (user == null) ? null : qCampsiteRepository.findCampsiteLikeByUser(campsiteIds, user);
        Map<Long, Double> avgScoreByCampsiteMap = qCampsiteRepository.findAvgScoreByCampsite(campsiteIds);

        // TODO: Time-consuming tasks. Need to optimise.
        List<Campsite> responseList = new java.util.ArrayList<>(responsePage.map((campsite) -> {
            List<Room> roomList = campsite.getRoomList();

            // available at least one room can be reserved on the date range
            campsite.setAvailable(
                roomList.stream()
                    .anyMatch(room -> !reservationRepository.existsReservationOnDateRange(room, startDate, endDate)));

            // Cheapest room price of this campsite
            campsite.setPrice(minPriceByCampsiteMap.getOrDefault(campsite.getId(), null));

            // Did I like this campsite
            if (user != null) {
                campsite.setLike(campsiteLikeByUserMap.getOrDefault(campsite.getId(), false));
            }

            // Avg review score
            campsite.setScore(avgScoreByCampsiteMap.getOrDefault(campsite.getId(), 0.0));

            return campsite;
        }).toList());

        if (induty != null || theme != null) {
            Collections.shuffle(responseList);
            return new Response(CampsiteConstant.CAMPSITE_LIST, responseListToPage(pageable, responseList));
        } else {
            CampsiteLocation center = getCenterOfCampsites(responseList);
            responseList.sort(Comparator.comparingDouble(
                    c -> Point2D.distance(
                        center.getMapX(), center.getMapY(),
                        c.getCampsiteLocation().getMapX(), c.getCampsiteLocation().getMapY()
                    )
                )
            );

            Response response = new Response(CampsiteConstant.CAMPSITE_LIST, responseListToPage(pageable, responseList));
            response.setDataIntoResponse(CampsiteConstant.MAP_COORDINATES, new HashMap<>() {{
                put("center", center);
            }});
            return response;
        }
    }

    private Page<CampsiteDto.Response> responseListToPage(Pageable pageable, List<Campsite> responseList) {
        return new PageImpl<>(responseList, PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()),
            responseList.size()).map(campsiteMapper::toCampsiteListResponseDto);
    }

    /**
     * Get center coordination from the list of campsites.
     *
     * @param campsiteList List of campsites.
     * @return Coordination instance that includes
     */
    public CampsiteLocation getCenterOfCampsites(List<Campsite> campsiteList) {
        double xAvg = 0, yAvg = 0;

        for (Campsite campsite : campsiteList) {
            xAvg += campsite.getCampsiteLocation().getMapX();
            yAvg += campsite.getCampsiteLocation().getMapY();
        }

        return CampsiteLocation.builder().mapX(xAvg / campsiteList.size()).mapY(yAvg / campsiteList.size()).build();
    }

    @Transactional(readOnly = true)
    public Page<CampsiteDto.Response> getOwnerCampsiteList(Pageable pageable) {
        User user = getUserByAccount();
        checkUserRoleOwner(user);
        return campsiteRepository.findByUser(pageable, user).map(campsiteMapper::toCampsiteListResponseDto);
    }

    /**
     * Regist a campsite.
     *
     * @param createRequestDto Campsite information.
     * @return Saved campsite information.
     * @throws NotFoundException     If not login status.
     * @throws UnauthorizedException If user does not have {@link RoleName#OWNER} role.
     */
    @Transactional
    public CampsiteDto.CreateResponse createCampsite(CampsiteDto.CreateRequest createRequestDto) throws NotFoundException {
        User user = getUserByAccount();
        checkUserRoleOwner(user);

        Campsite campsite = campsiteMapper.toCampsite(createRequestDto);
        campsite.setUser(user);

        /* TODO: insert campsite location(coordinates), induty, etc. */

        return campsiteMapper.toCreateResponseDto(campsiteRepository.save(campsite));
    }

    /**
     * Toggle whether the user like or not this campsite.
     *
     * @param campsiteId
     * @return Current like status.
     * @throws NotFoundException If not login status.
     */
    @Transactional
    public CampsiteDto.LikeResponse likeCampsite(long campsiteId) {
        User user = getUserByAccount();

        Campsite campsite = campsiteRepository.findById(campsiteId)
            .orElseThrow(() -> new NotFoundException(CampsiteExceptionCode.CAMPSITE_NOT_FOUND));

        Optional<CampsiteLike> campsiteLike = campsiteLikeRepository.findByCampsiteAndUser(campsite, user);
        campsiteLike.ifPresentOrElse(
            cl -> campsiteLikeRepository.deleteById(cl.getId()),
            () -> campsiteLikeRepository.save(CampsiteLike.builder().campsite(campsite).user(user).build())
        );
        return campsiteMapper.toCampsiteLikeResponseDto(campsiteLike.isEmpty());
    }

    /**
     * @param campsiteId
     * @param startDate  To check reservation availability.
     * @param endDate    To check reservation availability.
     * @param headCnt    To filter available room.
     * @param pageable
     * @return List of room information of the campsite.
     * @throws NotFoundException If the `campsiteId` is wrong.
     */
    @Transactional(readOnly = true)
    public Page<RoomDto.Response> getCampsiteRoomList(long campsiteId, LocalDate startDate, LocalDate endDate, int headCnt,
        Pageable pageable) {
        Campsite campsite = campsiteRepository.findById(campsiteId)
            .orElseThrow(() -> new NotFoundException(CampsiteExceptionCode.CAMPSITE_NOT_FOUND));

        List<Room> roomList = roomRepository.findByCampsite(campsite, pageable)
            .filter(room -> room.getMaxNo() >= headCnt)
            .map(room -> {
                room.setAvailable(!reservationRepository.existsReservationOnDateRange(room, startDate, endDate));
                return room;
            }).toList();

        return new PageImpl<>(roomList, PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()),
            roomList.size()).map(roomMapper::toRoomResponseDto);
    }

    /**
     * @param user Login user instance.
     * @throws UnauthorizedException If user does not have {@link RoleName#OWNER} role.
     */
    private void checkUserRoleOwner(User user) {
        if (!user.getRole().equals(RoleName.OWNER)) {
            throw new UnauthorizedException(AuthExceptionCode.UNAUTHORIZED_USER);
        }
    }

    private User getUserByAccount() {
        return userRepository.findByAccount(securityHelper.getLoginAccount())
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
    }

}
