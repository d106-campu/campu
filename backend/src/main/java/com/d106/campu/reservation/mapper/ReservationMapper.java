package com.d106.campu.reservation.mapper;

import com.d106.campu.reservation.domain.jpa.Reservation;
import com.d106.campu.reservation.dto.ReservationDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReservationMapper {

    ReservationDto.Response toReservationResponseDto(Reservation reservation);

}
