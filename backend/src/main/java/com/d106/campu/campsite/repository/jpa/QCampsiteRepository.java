package com.d106.campu.campsite.repository.jpa;

import com.d106.campu.campsite.domain.jpa.CampsiteLocation;
import com.d106.campu.campsite.domain.jpa.QCampsite;
import com.d106.campu.campsite.domain.jpa.QCampsiteLike;
import com.d106.campu.campsite.domain.jpa.QCampsiteLocation;
import com.d106.campu.campsite.domain.jpa.QCampsiteTheme;
import com.d106.campu.campsite.domain.jpa.QTheme;
import com.d106.campu.campsite.dto.CampsiteDto;
import com.d106.campu.campsite.dto.CampsiteDto.Response;
import com.d106.campu.user.domain.jpa.User;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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

    public Page<CampsiteDto.Response> findByTheme(String themeStr, User user, Pageable pageable) {

        // campsiteLike.id, campsiteLike.campsite, campsiteLike.user,
        Expression[] projections = new Expression[]{
            campsite.id, campsite.facltNm, campsite.lineIntro, campsite.doNm, campsite.sigunguNm, campsite.addr1,
            campsite.addr2, campsite.thumbnailImageUrl, campsiteLocation.mapX, campsiteLocation.mapY
        };

        BooleanBuilder predicates = new BooleanBuilder()
            .and(theme.themeStr.eq(themeStr));

        List<Tuple> tuples = jpaQueryFactory.select(projections)
            .from(campsite)
            .innerJoin(campsiteTheme).on(campsiteTheme.campsite.eq(campsite))
            .innerJoin(theme).on(campsiteTheme.theme.eq(theme))
            .innerJoin(campsite.campsiteLocation, campsiteLocation)
            .where(predicates)
            .orderBy(new OrderSpecifier[]{
                campsite.id.asc()
            })
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();

        Map<Long, Boolean> myLikeMap = new TreeMap<>();
        log.debug("user: {}", user);
        if (user != null) {
            List<Tuple> myLikeList = jpaQueryFactory.select(new Expression[]{campsiteLike.campsite})
                .from(campsiteLike)
                .where(campsiteLike.user.eq(user))
                .fetch();
            log.debug("myLikeList: {}", myLikeList);

            for (Tuple tuple : myLikeList) {
                myLikeMap.put(tuple.get(campsiteLike.campsite).getId(), true);
            }
        }

        List<CampsiteDto.Response> responseList = new ArrayList<>(tuples.size());
        for (Tuple tuple : tuples) {
            responseList.add(Response.builder()
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
                .like((user == null) ? false : myLikeMap.getOrDefault(tuple.get(campsite.id), false))
                .build());
        }

        Collections.shuffle(responseList);

        long totalCnt = Objects.requireNonNull(jpaQueryFactory.select(Expressions.ONE)
            .from(campsite)).fetchOne().longValue();

        return new PageImpl<>(responseList, pageable, totalCnt);
    }

}
