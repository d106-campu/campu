package com.d106.campu.campsite.service;

import com.d106.campu.auth.constant.RoleName;
import com.d106.campu.campsite.constant.CampsiteConstant;
import com.d106.campu.campsite.constant.IndutyEnum;
import com.d106.campu.campsite.constant.ThemeEnum;
import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.domain.jpa.CampsiteLike;
import com.d106.campu.campsite.domain.jpa.CampsiteLocation;
import com.d106.campu.campsite.domain.jpa.Fclty;
import com.d106.campu.campsite.domain.jpa.Theme;
import com.d106.campu.campsite.dto.CampsiteDto;
import com.d106.campu.campsite.exception.code.CampsiteExceptionCode;
import com.d106.campu.campsite.mapper.CampsiteMapper;
import com.d106.campu.campsite.repository.jpa.CampsiteLikeRepository;
import com.d106.campu.campsite.repository.jpa.CampsiteRepository;
import com.d106.campu.campsite.repository.jpa.FcltyRepository;
import com.d106.campu.campsite.repository.jpa.QCampsiteRepository;
import com.d106.campu.campsite.repository.jpa.ThemeRepository;
import com.d106.campu.common.constant.DoNmEnum;
import com.d106.campu.common.constant.SigunguEnum;
import com.d106.campu.common.exception.ConflictException;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.exception.UnauthorizedException;
import com.d106.campu.common.exception.code.CommonExceptionCode;
import com.d106.campu.common.response.Response;
import com.d106.campu.common.util.SecurityHelper;
import com.d106.campu.image.mapper.ImageMapper;
import com.d106.campu.review.repository.jpa.ReviewRepository;
import com.d106.campu.room.dto.RoomDto;
import com.d106.campu.room.repository.jpa.QRoomRepository;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.dto.UserDto;
import com.d106.campu.user.exception.code.UserExceptionCode;
import com.d106.campu.user.repository.jpa.UserRepository;
import java.awt.geom.Point2D;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
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
    private final ImageMapper imageMapper;

    private final FcltyRepository fcltyRepository;
    private final ThemeRepository themeRepository;

    private final QRoomRepository qRoomRepository;

    private final ReviewRepository reviewRepository;

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
        Map<Long, Long> minPriceByCampsiteMap = qCampsiteRepository.findCheapestRoomPriceByCampsite(campsiteIds, headCnt);
        Map<Long, Boolean> campsiteLikeByUserMap =
            (user == null) ? null : qCampsiteRepository.findCampsiteLikeByUser(campsiteIds, user);
        Map<Long, Double> avgScoreByCampsiteMap = qCampsiteRepository.findAvgScoreByCampsite(campsiteIds);
        Map<Long, Boolean> campsiteAvailabilityMap = qCampsiteRepository.availableByCampsiteAndDateRange(campsiteIds, headCnt,
            startDate, endDate);

        // TODO: Time-consuming tasks. Need to optimise.
        List<Campsite> responseList = new java.util.ArrayList<>(responsePage.map((campsite) -> {
            // available at least one room can be reserved on the date range
            campsite.setAvailable(campsiteAvailabilityMap.getOrDefault(campsite.getId(), false));

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
    public CampsiteDto.DetailResponse getCampsiteDetailById(Long campsiteId, User user) {
        Campsite campsite = campsiteRepository.findById(campsiteId)
            .orElseThrow(() -> new NotFoundException(CampsiteExceptionCode.CAMPSITE_NOT_FOUND));

        return CampsiteDto.DetailResponse.builder()
            .id(campsite.getId())
            .owner(UserDto.NicknameAndTel.builder()
                .nickName(campsite.getUser().getNickname())
                .tel(campsite.getUser().getNickname())
                .build())
            .facltNm(campsite.getFacltNm())
            .tel(campsite.getTel())
            .lineIntro(campsite.getLineIntro())
            .intro(campsite.getIntro())
            .allar(campsite.getAllar())
            .bizrno(campsite.getBizrno())
            .trsagntNo(campsite.getTrsagntNo())
            .doNm(campsite.getDoNm())
            .sigunguNm(campsite.getSigunguNm())
            .addr1(campsite.getAddr1())
            .addr2(campsite.getAddr2())
            .indutyList(List.of(campsite.getIndutyList().split(",")))
            .themeList(themeRepository.findByCampsiteThemeList_Campsite(campsite).stream().map(Theme::getThemeStr).toList())
            .facltList(fcltyRepository.findByCampsiteFcltyList_Campsite(campsite).stream().map(Fclty::getFcltyStr).toList())
            .score(reviewRepository.avgScoreByCampsite(campsite).orElse(0.0))
            .campsiteLocation(campsite.getCampsiteLocation())
            .sitedStnc(campsite.getSitedStnc())
            .animalCmgCl(campsite.getAnimalCmgCl())
            .like(user != null && campsiteLikeRepository.existsByCampsiteAndUser(campsite, user))
            .homepage(campsite.getHomepage())
            .thumbnailImageUrl(campsite.getThumbnailImageUrl())
            .mapImageUrl(campsite.getMapImageUrl())
            .campsiteImageUrlList(campsite.getCampsiteImageList().stream().map(imageMapper::toUploadListResponse).toList())
            .checkin(campsite.getCheckin())
            .checkout(campsite.getCheckout())
            .build();
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
        User user, Pageable pageable) {

        if (startDate.isAfter(endDate)) {
            throw new ConflictException(CommonExceptionCode.INACCESSIBLE_DATA);
        }

        Campsite campsite = campsiteRepository.findById(campsiteId)
            .orElseThrow(() -> new NotFoundException(CampsiteExceptionCode.CAMPSITE_NOT_FOUND));

        Map<Long, Boolean> campsiteAvailabilityMap = qRoomRepository.availableByCampsiteAndDateRange(campsite, headCnt,
            startDate,
            endDate);
        Map<Long, Boolean> emptyNotificationMap =
            (user == null) ? null : qRoomRepository.emptyNotificationByCampsiteAndDateRange(user, campsite,
                headCnt, startDate, endDate);

        Page<RoomDto.Response> roomPage = qRoomRepository.findByCampsite(campsite, headCnt, pageable);
        return roomPage.map(room -> {
            room.setAvailable(campsiteAvailabilityMap.getOrDefault(room.getId(), false));
            room.setEmptyNotification(user != null && emptyNotificationMap.getOrDefault(room.getId(), false));

            long dailyPrice = room.getPrice() + (headCnt - room.getBaseNo()) * room.getExtraPrice();
            long dateDiff = startDate.until(endDate, ChronoUnit.DAYS);
            room.setTotalPrice(dailyPrice * dateDiff);
            return room;
        });
    }

    private User getUserByAccount() {
        return userRepository.findByAccount(securityHelper.getLoginAccount())
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
    }

}
