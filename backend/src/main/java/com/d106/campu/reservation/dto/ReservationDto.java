package com.d106.campu.reservation.dto;

import com.d106.campu.reservation.constant.PaymentStatus;
import com.d106.campu.room.dto.RoomDto;
import com.d106.campu.user.dto.UserDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import lombok.Builder;
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

    @Data
    @Builder
    public static class ResponseWithUser {

        private Long id;
        private RoomDto.IdNameImage room;
        private UserDto.NicknameAndTel customer;
        private int headCnt;
        private LocalDate startDate;
        private LocalDate endDate;

        @Schema(description = "SUCCESS, FAIL, PREPARE, CANCEL 중 1")
        private PaymentStatus status;

    }

}
