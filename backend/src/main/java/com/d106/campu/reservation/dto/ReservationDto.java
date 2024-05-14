package com.d106.campu.reservation.dto;

import com.d106.campu.room.dto.RoomDto;
import java.time.LocalDate;
import lombok.Data;

public class ReservationDto {

    @Data
    public static class Response {

        private Long id;
        private RoomDto.RoomInfo room;
        private int headCnt;
        private Long price;
        private LocalDate startDate;
        private LocalDate endDate;

    }

}
