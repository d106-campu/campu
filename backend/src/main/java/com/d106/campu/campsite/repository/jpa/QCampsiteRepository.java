package com.d106.campu.campsite.repository.jpa;

import com.d106.campu.campsite.domain.jpa.CampsiteLocation;
import com.d106.campu.campsite.domain.jpa.QCampsite;
import com.d106.campu.campsite.domain.jpa.QCampsiteLike;
import com.d106.campu.campsite.domain.jpa.QCampsiteLocation;
import com.d106.campu.campsite.domain.jpa.QCampsiteTheme;
import com.d106.campu.campsite.domain.jpa.QTheme;
import com.d106.campu.campsite.dto.CampsiteDto;
import com.d106.campu.room.domain.jpa.QRoom;
import com.d106.campu.user.domain.jpa.User;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

@Slf4j
@RequiredArgsConstructor
@Repository
public class QCampsiteRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QCampsite campsite = QCampsite.campsite;
    private final QCampsiteTheme campsiteTheme = QCampsiteTheme.campsiteTheme;
    private final QTheme theme = QTheme.theme;
    private final QCampsiteLocation campsiteLocation = QCampsiteLocation.campsiteLocation;
    private final QCampsiteLike campsiteLike = QCampsiteLike.campsiteLike;
    private final QRoom room = QRoom.room;

    public Page<CampsiteDto.Response> findByTheme(String themeStr, int headCnt, Pageable pageable) {

        // campsiteLike.id, campsiteLike.campsite, campsiteLike.user,
        Expression[] projections = new Expression[]{
            campsite.id, campsite.facltNm, campsite.lineIntro, campsite.doNm, campsite.sigunguNm, campsite.addr1,
            campsite.addr2, campsite.thumbnailImageUrl, campsiteLocation.mapX, campsiteLocation.mapY, campsite.roomList
        };

        BooleanBuilder predicates = new BooleanBuilder()
            .and(theme.themeStr.eq(themeStr));

        List<Tuple> tuples = jpaQueryFactory
            .select(projections)
            .from(campsite)
            .innerJoin(campsite.campsiteThemeList, campsiteTheme)
            .innerJoin(campsiteTheme.theme, theme)
            .innerJoin(campsite.campsiteLocation, campsiteLocation)
            .leftJoin(campsite.roomList, room)
            .where(predicates)
            .orderBy(new OrderSpecifier[]{
                campsite.id.asc()
            })
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();

        List<CampsiteDto.Response> responseList = new ArrayList<>(tuples.size());
        for (Tuple tuple : tuples) {
            responseList.add(CampsiteDto.Response.builder()
                .id(tuple.get(campsite.id))
                .facltNm(tuple.get(campsite.facltNm))
                .lineIntro(tuple.get(campsite.lineIntro))
                .doNm(tuple.get(campsite.doNm))
                .sigunguNm(tuple.get(campsite.sigunguNm))
                .addr1(tuple.get(campsite.addr1))
                .addr2(tuple.get(campsite.addr2))
                .thumbnailImageUrl(tuple.get(campsite.thumbnailImageUrl))
                .campsiteLocation(CampsiteLocation.builder()
                    .mapX(tuple.get(campsiteLocation.mapX))
                    .mapY(tuple.get(campsiteLocation.mapY))
                    .build())
                .build());
        }

        JPAQuery<Long> countQuery = jpaQueryFactory
            .select(campsite.count())
            .from(campsite)
            .innerJoin(campsiteTheme).on(campsiteTheme.campsite.eq(campsite))
            .innerJoin(theme).on(campsiteTheme.theme.eq(theme))
            .where(predicates);

        return PageableExecutionUtils.getPage(responseList, pageable, countQuery::fetchOne);
    }

    public Map<Long, Integer> findCheapestRoomPriceByCampsite(List<Long> campsiteIds, int headCnt) {
        List<Tuple> tuples = jpaQueryFactory
            .select(new Expression[]{
                campsite.id, room.id, room.maxNo, room.price.min()
            })
            .from(campsite)
            .leftJoin(campsite.roomList, room)
            .where(new BooleanBuilder()
                .and(campsite.id.in(campsiteIds))
            )
            .groupBy(campsite.id)
            .orderBy(new OrderSpecifier[]{campsite.id.asc()})
            .fetch();

        Map<Long, Integer> responseMap = new TreeMap<>();
        tuples.forEach(tuple -> {
            responseMap.put(tuple.get(campsite.id), tuple.get(room.price.min()));
        });
        return responseMap;
    }

    public Map<Long, Boolean> findCampsiteLikeByUser(List<Long> campsiteIds, User user) {
        List<Tuple> tuples = jpaQueryFactory
            .select(new Expression[]{campsiteLike.id, campsiteLike.campsite.id})
            .from(campsiteLike)
            .where(new BooleanBuilder()
                .and(campsiteLike.campsite.id.in(campsiteIds))
                .and(campsiteLike.user.eq(user))
            )
            .orderBy(new OrderSpecifier[]{campsiteLike.id.asc()})
            .fetch();

        Map<Long, Boolean> responseMap = new TreeMap<>();
        tuples.forEach(tuple -> {
            responseMap.put(tuple.get(campsiteLike.campsite.id), true);
        });
        return responseMap;
    }

}
