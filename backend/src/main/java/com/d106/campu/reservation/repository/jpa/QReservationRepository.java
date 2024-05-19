package com.d106.campu.reservation.repository.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.domain.jpa.QCampsite;
import com.d106.campu.reservation.constant.PaymentStatus;
import com.d106.campu.reservation.domain.jpa.QReservation;
import com.d106.campu.reservation.dto.ReservationDto;
import com.d106.campu.room.domain.jpa.QRoom;
import com.d106.campu.room.dto.RoomDto;
import com.d106.campu.user.domain.jpa.QUser;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.dto.UserDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class QReservationRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QCampsite campsite = QCampsite.campsite;
    private final QRoom room = QRoom.room;
    private final QReservation reservation = QReservation.reservation;
    private final QUser user = QUser.user;

    public List<ReservationDto.ResponseWithUser> findReservationListByCampsiteAndOwner(Campsite targetCampsite, User owner,
        LocalDate today) {
        Expression<?>[] projection = new Expression[]{
            reservation.id, room.id, room.name, room.imageUrl, reservation.user.nickname, reservation.user.tel,
            reservation.headCnt, reservation.startDate, reservation.endDate, reservation.status,
        };

        BooleanBuilder predicates = new BooleanBuilder()
            .and(campsite.eq(targetCampsite))
            .and(campsite.user.eq(owner))
            .and(reservation.startDate.loe(today).and(reservation.endDate.goe(today)))
            .and(reservation.status.eq(PaymentStatus.SUCCESS));

        List<Tuple> tuples = jpaQueryFactory
            .select(projection)
            .from(campsite)
            .innerJoin(room).on(room.campsite.eq(campsite))
            .innerJoin(reservation).on(reservation.room.eq(room))
            .where(predicates)
            .orderBy(new OrderSpecifier[]{
                reservation.startDate.asc()
            })
            .fetch();

        return tuples.stream()
            .map(tuple -> ReservationDto.ResponseWithUser.builder()
                .id(tuple.get(reservation.id))
                .room(RoomDto.IdNameImage.builder()
                    .id(tuple.get(room.id))
                    .name(tuple.get(room.name))
                    .imageUrl(tuple.get(room.imageUrl))
                    .build())
                .customer(UserDto.NicknameAndTel.builder()
                    .nickName(tuple.get(reservation.user.nickname))
                    .tel(tuple.get(reservation.user.tel))
                    .build())
                .headCnt(tuple.get(reservation.headCnt))
                .startDate(tuple.get(reservation.startDate))
                .endDate(tuple.get(reservation.endDate))
                .status(tuple.get(reservation.status))
                .build())
            .collect(Collectors.toCollection(() -> new ArrayList<ReservationDto.ResponseWithUser>(tuples.size())));
    }

}
