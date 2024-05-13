package com.d106.campu.campsite.repository.jpa;

import com.d106.campu.campsite.domain.jpa.CampsiteLocation;
import com.d106.campu.campsite.domain.jpa.QCampsite;
import com.d106.campu.campsite.domain.jpa.QCampsiteLike;
import com.d106.campu.campsite.domain.jpa.QCampsiteLocation;
import com.d106.campu.campsite.domain.jpa.QCampsiteTheme;
import com.d106.campu.campsite.domain.jpa.QTheme;
import com.d106.campu.campsite.dto.CampsiteDto;
import com.d106.campu.reservation.domain.jpa.QReservation;
import com.d106.campu.review.domain.jpa.QReview;
import com.d106.campu.room.domain.jpa.QRoom;
import com.d106.campu.user.domain.jpa.User;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

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
    private final QReview review = QReview.review;
    private final QReservation reservation = QReservation.reservation;

    public Optional<CampsiteDto.DetailResponse> findById(Long campsiteId) {
        Expression[] projections = new Expression[]{
            campsite.id
        };

        BooleanBuilder predicates = new BooleanBuilder();

        List<Tuple> tuples = jpaQueryFactory.select(projections)
            .from(campsite)
            .limit(1L)
            .fetch();

        if (tuples.size() == 0) {
            return Optional.empty();
        }
        
        Tuple tuple = tuples.getFirst();

        return Optional.of(CampsiteDto.DetailResponse.builder()
            .id(tuple.get(campsite.id))
            .build());
    }

    public Page<CampsiteDto.Response> findByTheme(String themeStr, int headCnt, Pageable pageable) {

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

    public Map<Long, Double> findAvgScoreByCampsite(List<Long> campsiteIds) {
        List<Tuple> tuples = jpaQueryFactory
            .select(new Expression[]{
                review.campsite.id, review.score.avg()
            })
            .from(review)
            .where(new BooleanBuilder()
                .and(review.campsite.id.in(campsiteIds))
            )
            .groupBy(review.campsite.id)
            .orderBy(new OrderSpecifier[]{review.campsite.id.asc()})
            .fetch();

        Map<Long, Double> responseMap = new TreeMap<>();
        tuples.forEach(tuple -> {
            responseMap.put(tuple.get(review.campsite.id), tuple.get(review.score.avg()));
        });
        return responseMap;
    }

    /**
     * @param campsiteIds ID list of target campsites.
     * @param headCnt     To limit room list.
     * @param startDate   To find already booked on the range.
     * @param endDate     To find already booked on the range.
     * @return <code>Campsite Id</code> - <code>Able to reserve T/F</code>.<br><ul><li>If <code>num_room_resrv</code> is greater
     * than or equals to <code>num_rooms</code>, it means every room is booked on the date range. In this case, return value
     * will be <code>false</code>.</li><li>Other case, it means the campsite has more than one room without reservation, so
     * return <code>true</code>.</li></ul>
     *
     * <pre>{@code
     * select
     *     c.id campsite_id,
     *     room.id room_id,
     *     sum(case
     *         when (
     *             (reservation.start_date = @start_date)
     *             or ((@start_date < reservation.start_date) and (reservation.start_date < @end_date))
     *             or ((reservation.start_date < @start_date) and (@start_date < reservation.end_date))
     *         ) then 1
     *         else 0
     *     end) numRoomResrv
     * from campsite c
     *     inner join room on c.id = room.campsite_id
     *     left outer join reservation on room.id = reservation.room_id
     * where c.id in :campsiteIds
     *     and room.max_no >= :headCnt
     * GROUP BY c.id, room.id
     * ORDER BY c.id, room.id;
     * }</pre>
     *
     * <pre>{@code
     * campsite_id	room_id	num_room_resrv
     *           1        1              2      // Campsite 1 cannot be reserved.
     *           2        2              2      // Campsite 2 can be reserved
     *           2        4              0      // because room #4 has no reservation.
     *           3        5              0
     *           4        7              0
     * }</pre>
     */
    public Map<Long, Boolean> availableOnDateRangeByCampsite(
        List<Long> campsiteIds, int headCnt, LocalDate startDate, LocalDate endDate
    ) {
        List<Tuple> tuples = jpaQueryFactory
            .select(new Expression[]{
                campsite.id,
                room.id,
                new CaseBuilder()
                    .when(
                        reservation.startDate.eq(startDate)
                            .or(reservation.startDate.gt(startDate).and(reservation.startDate.lt(endDate)))
                            .or(reservation.startDate.lt(startDate).and(reservation.endDate.gt(startDate))))
                    .then(1)
                    .otherwise(0)
                    .sum()
                    .as("numRoomResrv")
            })
            .from(campsite)
            .innerJoin(room).on(campsite.eq(room.campsite))
            .leftJoin(reservation).on(room.eq(reservation.room))
            .where(new BooleanBuilder()
                .and(campsite.id.in(campsiteIds))
                .and(room.maxNo.goe(headCnt))
            )
            .groupBy(campsite.id, room.id)
            .orderBy(new OrderSpecifier[]{campsite.id.asc(), room.id.asc()})
            .fetch();

        Map<Long, Boolean> responseMap = new TreeMap<>();
        tuples.forEach(tuple -> {
            long cid = tuple.get(campsite.id);
            responseMap.put(cid, (tuple.get(2, Integer.class) == 0) || responseMap.getOrDefault(cid, false));
        });
        return responseMap;
    }

}
