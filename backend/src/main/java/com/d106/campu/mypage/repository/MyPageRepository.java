package com.d106.campu.mypage.repository;

import com.d106.campu.campsite.domain.jpa.QCampsite;
import com.d106.campu.campsite.domain.jpa.QCampsiteLocation;
import com.d106.campu.mypage.constant.DateType;
import com.d106.campu.mypage.constant.MyPageConstant;
import com.d106.campu.mypage.constant.UseType;
import com.d106.campu.mypage.dto.MyPageDto.ReservationResponse;
import com.d106.campu.reservation.domain.jpa.QReservation;
import com.d106.campu.review.domain.jpa.QReview;
import com.d106.campu.room.domain.jpa.QRoom;
import com.d106.campu.user.domain.jpa.QUser;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class MyPageRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QUser user = QUser.user;
    private final QCampsite campsite = QCampsite.campsite;
    private final QRoom room = QRoom.room;
    private final QReservation reservation = QReservation.reservation;
    private final QReview review = QReview.review;
    private final QCampsiteLocation campsiteLocation = QCampsiteLocation.campsiteLocation;

    public Page<ReservationResponse> getReservationList(Pageable pageable, String account, DateType dateType, UseType useType) {

        Expression<?>[] projections = new Expression[]{
            campsite.id, campsite.addr1, campsite.thumbnailImageUrl,
            room.id, room.name, room.supplyList,
            reservation.id, reservation.headCnt, reservation.price, reservation.startDate, reservation.endDate,
            campsiteLocation.mapX, campsiteLocation.mapY,
            review.id
        };

        BooleanBuilder predicate = new BooleanBuilder();
        predicate.and(user.account.eq(account));

        if (dateType.equals(DateType.MONTH)) {
            predicate.and(reservation.startDate.goe(LocalDate.now().minusMonths(1L)));
        } else if (dateType.equals(DateType.MONTH6)) {
            predicate.and(reservation.startDate.goe(LocalDate.now().minusMonths(6L)));
        } else if (dateType.equals(DateType.YEAR)) {
            predicate.and(reservation.startDate.goe(LocalDate.now().minusYears(1L)));
        }

        if (useType.equals(UseType.BEFORE)) {
            predicate.and(reservation.endDate.goe(LocalDate.now()));
        } else if (useType.equals(UseType.AFTER)) {
            predicate.and(reservation.endDate.loe(LocalDate.now()));
        }

        OrderSpecifier<?>[] orderBys = new OrderSpecifier[]{
            reservation.endDate.desc()
        };

        List<Tuple> tuples = jpaQueryFactory.select(projections)
            .from(reservation).join(user).on(reservation.user.eq(user))
            .join(room).on(reservation.room.eq(room))
            .join(campsite).on(room.campsite.eq(campsite))
            .join(campsiteLocation).on(campsiteLocation.campsite.eq(campsite))
            .leftJoin(review).on(review.reservation.eq(reservation))
            .where(predicate)
            .orderBy(orderBys)
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize()).fetch();

        List<ReservationResponse> reservationResponses = new ArrayList<>();
        for (Tuple tuple : tuples) {
            String status;
            if (Objects.requireNonNull(tuple.get(reservation.endDate)).isAfter(LocalDate.now())) {
                status = MyPageConstant.RESERVATION_CANCLE;
            } else if (tuple.get(review.id) == null) {
                status = MyPageConstant.REVIEW;
            } else {
                status = MyPageConstant.RESERVATION;
            }

            reservationResponses.add(ReservationResponse.builder()
                .campsiteId(tuple.get(campsite.id))
                .address(tuple.get(campsite.addr1))
                .thumbnailImageUrl(tuple.get(campsite.thumbnailImageUrl))
                .roomId(tuple.get(room.id))
                .roomName(tuple.get(room.name))
                .supplyList(tuple.get(room.supplyList))
                .reservationId(tuple.get(reservation.id))
                .headCnt(tuple.get(reservation.headCnt))
                .price(tuple.get(reservation.price))
                .startDate(tuple.get(reservation.startDate))
                .endDate(tuple.get(reservation.endDate))
                .status(status)
                .mapX(tuple.get(campsiteLocation.mapX))
                .mapY(tuple.get(campsiteLocation.mapY))
                .build());
        }

        return new PageImpl<>(reservationResponses, pageable, getTotalCount(account));
    }

    private long getTotalCount(String account) {
        return Objects.requireNonNull(jpaQueryFactory.select(Expressions.ONE)
            .from(reservation)
            .join(reservation.user, user)
            .where(user.account.eq(account))
            .fetchOne()).longValue();
    }

}
