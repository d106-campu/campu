package com.d106.campu.campsite.service;

import com.d106.campu.auth.constant.RoleName;
import com.d106.campu.auth.exception.code.AuthExceptionCode;
import com.d106.campu.campsite.constant.GetCampsiteListEnum.Induty;
import com.d106.campu.campsite.constant.GetCampsiteListEnum.Theme;
import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.domain.jpa.CampsiteLike;
import com.d106.campu.campsite.domain.jpa.CampsiteLocation;
import com.d106.campu.campsite.dto.CampsiteDto;
import com.d106.campu.campsite.exception.code.CampsiteExceptionCode;
import com.d106.campu.campsite.mapper.CampsiteMapper;
import com.d106.campu.campsite.repository.jpa.CampsiteLikeRepository;
import com.d106.campu.campsite.repository.jpa.CampsiteRepository;
import com.d106.campu.common.constant.DoNmEnum;
import com.d106.campu.common.constant.SigunguEnum;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.exception.UnauthorizedException;
import com.d106.campu.reservation.repository.jpa.ReservationRepository;
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
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CampsiteService {

    private final ReservationRepository reservationRepository;

    private final UserRepository userRepository;

    private final CampsiteRepository campsiteRepository;
    private final CampsiteLikeRepository campsiteLikeRepository;
    private final CampsiteMapper campsiteMapper;

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    /**
     * @param doNm      To limit location.
     * @param sigunguNm To limit location.
     * @param startDate To check reservation availability.
     * @param endDate   To check reservation availability.
     * @param headCnt   To filter available room.
     * @param induty    For campsites that has specific industry type.
     * @param theme     For campsites that has specific theme.
     * @param owner     For campsites that the current user manages.
     * @param pageable
     * @return List of campsite.
     * @throws NotFoundException     If not login status.
     * @throws UnauthorizedException Only when `owner=true` option, if user does not have {@link RoleName#OWNER} role.
     * @see Induty
     * @see Theme
     */
    @Transactional(readOnly = true)
    public CampsiteDto.CampsiteListResponse getCampsiteList(
        DoNmEnum doNm,
        SigunguEnum sigunguNm,
        LocalDate startDate,
        LocalDate endDate,
        int headCnt,
        String induty,
        String theme,
        boolean owner,
        Pageable pageable
    ) {
        /* TODO: Replace this with login user (using securityHelper) */
        User user = userRepository.findById(2L)
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));

        String doNmStr = (doNm == null) ? null : doNm.getName();
        String sigunguNmStr = (sigunguNm == null) ? null : sigunguNm.getName();

        Page<Campsite> responsePage = null;
        if (owner) {
            checkUserRoleOwner(user);
            responsePage = campsiteRepository.findByUser(pageable, user);
        } else if (induty == null && theme == null) {
            responsePage = campsiteRepository.findAll(pageable, doNmStr, sigunguNmStr);
        } else if (induty != null && !induty.isBlank()) {
            responsePage = campsiteRepository.findByIndutyListContaining(
                pageable, doNmStr, sigunguNmStr, Induty.of(induty).getValue());
        } else if (theme != null && !theme.isBlank()) {
            responsePage = campsiteRepository.findByCampsiteThemeList_Theme_Theme(
                pageable, doNmStr, sigunguNmStr, Theme.of(theme).getValue());
        }

        if (responsePage == null) {
            return null;
        }

        // TODO: Time-consuming tasks. Need to optimise.
        List<Campsite> responseList = new java.util.ArrayList<>(responsePage.map((campsite) -> {
            // available at least one room can be reserved on the date range
            campsite.setAvailable(campsite.getRoomList().stream().filter(room -> (room.getMaxNo() >= headCnt))
                .anyMatch(room -> !reservationRepository.existsReservationOnDateRange(room, startDate, endDate)));
            // Did I like this campsite
            campsite.setLike(campsiteLikeRepository.existsByCampsiteAndUser(campsite, user));
            return campsite;
        }).toList());

        if (induty != null || theme != null) {
            Collections.shuffle(responseList);
            return CampsiteDto.CampsiteListResponse.builder().campsiteList(responseListToPage(pageable, responseList)).build();
        } else {
            CampsiteLocation center = getCenterOfCampsites(responseList);
            responseList.sort(Comparator.comparingDouble(
                    c -> Point2D.distance(
                        center.getMapX(), center.getMapY(),
                        c.getCampsiteLocation().getMapX(), c.getCampsiteLocation().getMapY()
                    )
                )
            );

            return CampsiteDto.CampsiteListWithCenterResponse.builder()
                .campsiteList(responseListToPage(pageable, responseList))
                .mapCoordinates(new HashMap<>() {{
                    put("center", center);
                }})
                .build();
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
        /* TODO: Replace this with login user (using securityHelper)
        User user = userRepository.findByAccount(securityHelper.getLoginUserAccount())
            .orElseThrow(() -> new NotFoundException());*/
        User user = userRepository.findById(2L)
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
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
        /* TODO: Replace this with login user (using securityHelper) */
        User user = userRepository.findById(1L)
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));

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
     * @param pageable
     * @param campsiteId
     * @return List of room information of the campsite.
     * @throws NotFoundException If the `campsiteId` is wrong.
     */
    @Transactional(readOnly = true)
    public Page<RoomDto.ListResponse> getCampsiteRoomList(Pageable pageable, long campsiteId) {
        Campsite campsite = campsiteRepository.findById(campsiteId)
            .orElseThrow(() -> new NotFoundException(CampsiteExceptionCode.CAMPSITE_NOT_FOUND));
        return roomRepository.findByCampsite(pageable, campsite).map(roomMapper::toRoomResponseDto);
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

}
