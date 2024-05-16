package com.d106.campu.mypage.repository;

import com.d106.campu.campsite.domain.jpa.QCampsite;
import com.d106.campu.campsite.domain.jpa.QCampsiteLike;
import com.d106.campu.campsite.domain.jpa.QCampsiteLocation;
import com.d106.campu.mypage.constant.DateType;
import com.d106.campu.mypage.constant.MyPageConstant;
import com.d106.campu.mypage.constant.UseType;
import com.d106.campu.mypage.dto.MyPageDto.CampsiteLocationResponse;
import com.d106.campu.mypage.dto.MyPageDto.CampsiteResponse;
import com.d106.campu.mypage.dto.MyPageDto.MyCampsiteResponse;
import com.d106.campu.mypage.dto.MyPageDto.MyReservationResponse;
import com.d106.campu.mypage.dto.MyPageDto.MyReviewResponse;
import com.d106.campu.mypage.dto.MyPageDto.ReservationResponse;
import com.d106.campu.mypage.dto.MyPageDto.ReviewReservationResponse;
import com.d106.campu.mypage.dto.MyPageDto.ReviewResponse;
import com.d106.campu.mypage.dto.MyPageDto.RoomResponse;
import com.d106.campu.reservation.constant.PaymentStatus;
import com.d106.campu.reservation.domain.jpa.QReservation;
import com.d106.campu.review.domain.jpa.QReview;
import com.d106.campu.review.domain.jpa.QReviewImage;
import com.d106.campu.room.domain.jpa.QRoom;
import com.d106.campu.user.domain.jpa.QUser;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private final QCampsiteLike campsiteLike = QCampsiteLike.campsiteLike;
    private final QRoom room = QRoom.room;
    private final QReservation reservation = QReservation.reservation;
    private final QReview review = QReview.review;
    private final QReviewImage reviewImage = QReviewImage.reviewImage;
    private final QCampsiteLocation campsiteLocation = QCampsiteLocation.campsiteLocation;

    public Page<MyReservationResponse> getReservationList(Pageable pageable, String account, DateType dateType,
        UseType useType) {

        Expression<?>[] projections = new Expression[]{
            campsite.id, campsite.facltNm, campsite.addr1, campsite.thumbnailImageUrl,
            room.id, room.name, room.supplyList,
            reservation.id, reservation.headCnt, reservation.price, reservation.startDate, reservation.endDate,
            reservation.reservationPayment.impUid,
            campsiteLocation.mapX, campsiteLocation.mapY,
            review.id
        };

        BooleanBuilder predicate = new BooleanBuilder();
        predicate.and(user.account.eq(account));
        predicate.and(reservation.status.eq(PaymentStatus.SUCCESS));

        if (useType.equals(UseType.AFTER)) {
            if (dateType.equals(DateType.MONTH)) {
                predicate.and(reservation.startDate.goe(LocalDate.now().minusMonths(1L)));
            } else if (dateType.equals(DateType.MONTH6)) {
                predicate.and(reservation.startDate.goe(LocalDate.now().minusMonths(6L)));
            } else if (dateType.equals(DateType.YEAR)) {
                predicate.and(reservation.startDate.goe(LocalDate.now().minusYears(1L)));
            }
            predicate.and(reservation.endDate.lt(LocalDate.now()));
        }

        if (useType.equals(UseType.BEFORE)) {
            predicate.and(reservation.endDate.goe(LocalDate.now()));
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

        List<MyReservationResponse> myReservationResponseList = new ArrayList<>();
        for (Tuple tuple : tuples) {
            String status;
            if (Objects.requireNonNull(tuple.get(reservation.startDate)).isAfter(LocalDate.now())) {
                status = MyPageConstant.RESERVATION_CANCLE;
            } else if (tuple.get(review.id) == null) {
                status = MyPageConstant.REVIEW;
            } else {
                status = MyPageConstant.RESERVATION;
            }

            myReservationResponseList.add(MyReservationResponse.builder()
                .campsite(CampsiteResponse.builder()
                    .campsiteId(tuple.get(campsite.id))
                    .campsiteName(tuple.get(campsite.facltNm))
                    .address(tuple.get(campsite.addr1))
                    .thumbnailImageUrl(tuple.get(campsite.thumbnailImageUrl))
                    .build())
                .room(RoomResponse.builder()
                    .roomId(tuple.get(room.id))
                    .roomName(tuple.get(room.name))
                    .supplyList(tuple.get(room.supplyList))
                    .build())
                .reservation(ReservationResponse.builder()
                    .reservationId(tuple.get(reservation.id))
                    .impUid(tuple.get(reservation.reservationPayment.impUid))
                    .headCnt(tuple.get(reservation.headCnt))
                    .price(tuple.get(reservation.price))
                    .startDate(tuple.get(reservation.startDate))
                    .endDate(tuple.get(reservation.endDate))
                    .status(status)
                    .build())
                .campsiteLocation(CampsiteLocationResponse.builder()
                    .mapX(tuple.get(campsiteLocation.mapX))
                    .mapY(tuple.get(campsiteLocation.mapY))
                    .build())
                .build());
        }

        if (myReservationResponseList.isEmpty()) {
            return null;
        }
        return new PageImpl<>(myReservationResponseList, pageable, getReservationCountByAccount(account));
    }

    public Page<MyReviewResponse> getReviewList(Pageable pageable, String account, DateType dateType) {

        Expression<?>[] projections = new Expression[]{
            review.id, review.score, review.content, review.createTime,
            campsite.id, campsite.facltNm,
            room.name,
            reviewImage.url
        };

        BooleanBuilder predicate = new BooleanBuilder();
        predicate.and(user.account.eq(account));

        if (dateType.equals(DateType.MONTH)) {
            predicate.and(review.createTime.goe(LocalDateTime.now().minusMonths(1L)));
        } else if (dateType.equals(DateType.MONTH6)) {
            predicate.and(review.createTime.goe(LocalDateTime.now().minusMonths(6L)));
        } else if (dateType.equals(DateType.YEAR)) {
            predicate.and(review.createTime.goe(LocalDateTime.now().minusYears(1L)));
        }

        OrderSpecifier<?>[] orderBys = new OrderSpecifier[]{
            review.createTime.desc()
        };

        List<Tuple> tuples = jpaQueryFactory.select(projections)
            .from(review).join(campsite).on(review.campsite.eq(campsite))
            .join(user).on(reservation.user.eq(user))
            .join(room).on(reservation.room.eq(room))
            .leftJoin(reviewImage).on(reviewImage.review.eq(review))
            .where(predicate)
            .groupBy(review)
            .orderBy(orderBys)
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize()).fetch();

        List<MyReviewResponse> myReviewResponseList = new ArrayList<>();
        for (Tuple tuple : tuples) {
            myReviewResponseList.add(MyReviewResponse.builder()
                .review(ReviewResponse.builder()
                    .reviewId(tuple.get(review.id))
                    .score(tuple.get(review.score))
                    .content(tuple.get(review.content))
                    .createTime(tuple.get(review.createTime))
                    .imageUrl(tuple.get(reviewImage.url))
                    .build())
                .reservation(ReviewReservationResponse.builder()
                    .campsiteId(tuple.get(campsite.id))
                    .campsiteName(tuple.get(campsite.facltNm))
                    .roomName(tuple.get(room.name))
                    .build())
                .build());
        }

        if (myReviewResponseList.isEmpty()) {
            return null;
        }
        return new PageImpl<>(myReviewResponseList, pageable, getReviewCountByAccount(account));
    }

    public Page<MyCampsiteResponse> getCampsiteList(Pageable pageable, String account) {
        Expression<?>[] projections = new Expression[]{
            campsite.id, campsite.facltNm, campsite.thumbnailImageUrl,
            campsite.lineIntro, campsite.addr1,
            room.price.min(),
            review.score.avg(),
        };

        BooleanBuilder predicate = new BooleanBuilder();
        predicate.and(user.account.eq(account));

        OrderSpecifier<?>[] orderBys = new OrderSpecifier[]{
            campsiteLike.createTime.desc()
        };

        List<Tuple> tuples = jpaQueryFactory.select(projections)
            .from(campsiteLike).join(campsite).on(campsiteLike.campsite.eq(campsite))
            .join(user).on(campsiteLike.user.eq(user))
            .join(room).on(room.campsite.eq(campsite))
            .leftJoin(review).on(review.campsite.eq(campsite))
            .where(predicate)
            .groupBy(campsite)
            .orderBy(orderBys)
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize()).fetch();

        List<MyCampsiteResponse> myCampsiteResponseList = new ArrayList<>();
        for (Tuple tuple : tuples) {
            Double score = tuple.get(review.score.avg());

            myCampsiteResponseList.add(MyCampsiteResponse.builder()
                .campsiteId(tuple.get(campsite.id))
                .campsiteName(tuple.get(campsite.facltNm))
                .thumbnailImageUrl(tuple.get(campsite.thumbnailImageUrl))
                .lineIntro(tuple.get(campsite.intro))
                .address(tuple.get(campsite.addr1))
                .minPrice(tuple.get(room.price.min()))
                .score(score == null ? 0.0 : Math.round(score * 10) / 10.0)
                .build());
        }

        if (myCampsiteResponseList.isEmpty()) {
            return null;
        }
        return new PageImpl<>(myCampsiteResponseList, pageable, getCampsiteCountByAccount(account));
    }

    private long getCampsiteCountByAccount(String account) {
        return Objects.requireNonNull(jpaQueryFactory.select(Expressions.ONE)
            .from(campsiteLike)
            .join(campsiteLike.user, user)
            .where(user.account.eq(account))
            .fetchOne()).longValue();
    }

    private long getReviewCountByAccount(String account) {
        return Objects.requireNonNull(jpaQueryFactory.select(Expressions.ONE)
            .from(review)
            .join(review.reservation.user, user)
            .where(user.account.eq(account))
            .fetchOne()).longValue();
    }

    private long getReservationCountByAccount(String account) {
        return Objects.requireNonNull(jpaQueryFactory.select(Expressions.ONE)
            .from(reservation)
            .join(reservation.user, user)
            .where(user.account.eq(account))
            .fetchOne()).longValue();
    }

}
