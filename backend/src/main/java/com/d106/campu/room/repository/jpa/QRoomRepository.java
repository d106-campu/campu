package com.d106.campu.room.repository.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.emptynotification.domain.jpa.QEmptyNotification;
import com.d106.campu.reservation.constant.PaymentStatus;
import com.d106.campu.reservation.domain.jpa.QReservation;
import com.d106.campu.room.domain.jpa.QRoom;
import com.d106.campu.room.dto.RoomDto;
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
import java.util.TreeMap;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class QRoomRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QRoom room = QRoom.room;
    private final QReservation reservation = QReservation.reservation;
    private final QEmptyNotification emptyNotification = QEmptyNotification.emptyNotification;

    public Page<RoomDto.Response> findByCampsite(Campsite campsite, int headCnt, Pageable pageable) {

        Expression<?>[] projections = new Expression[]{
            room.id, room.name, room.induty.indutyStr, room.baseNo, room.maxNo, room.price, room.extraPrice, room.roomCnt,
            room.toiletCnt, room.supplyList, room.imageUrl
        };

        BooleanBuilder predicates = new BooleanBuilder()
            .and(room.campsite.eq(campsite))
            .and(room.maxNo.goe(headCnt));

        List<Tuple> tuples = jpaQueryFactory
            .select(projections)
            .from(room)
            .where(predicates)
            .orderBy(new OrderSpecifier[]{
                room.campsite.id.asc()
            })
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();

        List<RoomDto.Response> responseList = new ArrayList<>(tuples.size());
        tuples.forEach(tuple -> responseList.add(RoomDto.Response.builder()
            .id(tuple.get(room.id))
            .name(tuple.get(room.name))
            .induty(tuple.get(room.induty.indutyStr))
            .baseNo(tuple.get(room.baseNo))
            .maxNo(tuple.get(room.maxNo))
            .price(tuple.get(room.price))
            .extraPrice(tuple.get(room.extraPrice))
            .roomCnt(tuple.get(room.roomCnt))
            .toiletCnt(tuple.get(room.toiletCnt))
            .supplyList(tuple.get(room.supplyList))
            .imageUrl(tuple.get(room.imageUrl))
            .build()));

        JPAQuery<Long> countQuery = jpaQueryFactory.select(room.count()).from(room).where(predicates);

        return PageableExecutionUtils.getPage(responseList, pageable, countQuery::fetchOne);
    }

    public Map<Long, Boolean> availableByCampsiteAndDateRange(Campsite campsite, int headCnt, LocalDate startDate,
        LocalDate endDate) {
        Expression<?>[] projections = new Expression[]{
            room.id,
            new CaseBuilder()
                .when(
                    (reservation.startDate.eq(startDate)
                        .or(reservation.startDate.gt(startDate).and(reservation.startDate.lt(endDate)))
                        .or(reservation.startDate.lt(startDate).and(reservation.endDate.gt(startDate)))
                    ).and(reservation.status.eq(PaymentStatus.SUCCESS))
                )
                .then(1)
                .otherwise(0)
                .sum()
                .as("numRoomResrv")
        };

        BooleanBuilder predicates = new BooleanBuilder()
            .and(room.campsite.eq(campsite))
            .and(room.maxNo.goe(headCnt));

        List<Tuple> tuples = jpaQueryFactory
            .select(projections)
            .from(room)
            .leftJoin(reservation).on(room.eq(reservation.room))
            .where(predicates)
            .groupBy(room.id)
            .orderBy(new OrderSpecifier[]{
                room.id.asc()
            })
            .fetch();

        Map<Long, Boolean> responseMap = new TreeMap<>();
        tuples.forEach(tuple -> {
            long rid = tuple.get(room.id);
            responseMap.put(rid, (tuple.get(1, Integer.class) == 0) || responseMap.getOrDefault(rid, false));
        });
        return responseMap;
    }

    public Map<Long, Boolean> emptyNotificationByCampsiteAndDateRange(User user, Campsite campsite, int headCnt,
        LocalDate startDate,
        LocalDate endDate) {
        Expression<?>[] projections = new Expression[]{
            room.id,
            new CaseBuilder()
                .when(
                    emptyNotification.startDate.eq(startDate)
                        .or(emptyNotification.startDate.gt(startDate).and(emptyNotification.startDate.lt(endDate)))
                        .or(emptyNotification.startDate.lt(startDate).and(emptyNotification.endDate.gt(startDate))))
                .then(true)
                .otherwise(false)
        };

        BooleanBuilder predicates = new BooleanBuilder()
            .and(emptyNotification.user.eq(user))
            .and(room.in(campsite.getRoomList()))
            .and(room.maxNo.goe(headCnt));

        List<Tuple> tuples = jpaQueryFactory
            .select(projections)
            .from(room)
            .leftJoin(emptyNotification).on(room.eq(emptyNotification.room))
            .where(predicates)
            .groupBy(room.id)
            .orderBy(new OrderSpecifier[]{
                room.id.asc()
            })
            .fetch();

        Map<Long, Boolean> responseMap = new TreeMap<>();
        tuples.forEach(tuple -> responseMap.put(tuple.get(room.id), tuple.get(1, Boolean.class)));
        return responseMap;
    }

}
