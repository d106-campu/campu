package com.d106.campu.payment.dto;

import com.d106.campu.room.dto.RoomDto;
import java.time.LocalDate;
import lombok.Data;

public class PaymentDto {

    @Data
    public static class CompleteRequest {

        private String reservationId;
        private String impUid;
        private String merchantUid;

    }

    @Data
    public static class CompleteResponse {

        private String impUid;
        private Long reservationId;
        private RoomDto.RoomInfo room;
        private int headCnt;
        private int price;
        private LocalDate startDate;
        private LocalDate endDate;
        private String status;
        private int amount;

    }

    @Data
    public static class CancelResponse {

        private String impUid;
        private Long reservationId;
        private RoomDto.RoomInfo room;
        private int headCnt;
        private int price;
        private LocalDate startDate;
        private LocalDate endDate;
        private String status;
        private int amount;

    }

    @Data
    public static class PrepareRequest {

        private Long roomId;
        private int headCnt;
        private int price;
        private LocalDate startDate;
        private LocalDate endDate;

    }

    @Data
    public static class PrepareResponse {

        private Long reservationId;
        private String merchantUid;
        private String pg;
        private String payMethod;
        private String name;
        private int amount;
        private String buyerEmail;
        private String buyerName;
        private String buyerTel;
        private String buyerAddr;
        private String buyerPostcode;

    }

    @Data
    public static class CancelRequest {

        private Long reservationId;
        private String impUid;
        private String reason;

    }

}
