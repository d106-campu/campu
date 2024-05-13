package com.d106.campu.reservation.mapper;

import com.d106.campu.payment.dto.PaymentDto;
import com.d106.campu.reservation.domain.jpa.Reservation;
import com.d106.campu.reservation.dto.ReservationDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReservationMapper {

    ReservationDto.Response toReservationResponseDto(Reservation reservation);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "room", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "reservationPayment", ignore = true)
    @Mapping(target = "reservationCancel", ignore = true)
    Reservation toReservation(PaymentDto.PrepareRequest prepareRequest);

    @Mapping(target = "reservationId", source = "reservation.id")
    @Mapping(target = "merchantUid", source = "reservation.reservationPayment.merchantUid")
    @Mapping(target = "pg", source = "reservation.reservationPayment.pg")
    @Mapping(target = "payMethod", source = "reservation.reservationPayment.payMethod")
    @Mapping(target = "name", source = "reservation.reservationPayment.name")
    @Mapping(target = "amount", source = "reservation.reservationPayment.amount")
    @Mapping(target = "buyerEmail", source = "reservation.reservationPayment.buyerEmail")
    @Mapping(target = "buyerName", source = "reservation.reservationPayment.buyerName")
    @Mapping(target = "buyerTel", source = "reservation.reservationPayment.buyerTel")
    @Mapping(target = "buyerAddr", source = "reservation.reservationPayment.buyerAddr")
    @Mapping(target = "buyerPostcode", source = "reservation.reservationPayment.buyerPostcode")
    PaymentDto.PrepareResponse toPrepareResponseDto(Reservation reservation);

    @Mapping(target = "amount", source = "reservation.reservationPayment.amount")
    @Mapping(target = "impUid", source = "reservation.reservationPayment.impUid")
    @Mapping(target = "reservationId", source = "reservation.id")
    PaymentDto.CompleteResponse toCompleteResponseDto(Reservation reservation);

}
