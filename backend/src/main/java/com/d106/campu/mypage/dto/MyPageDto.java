package com.d106.campu.mypage.dto;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;

public class MyPageDto {

    @Builder
    @Getter
    public static class MyReservationResponse {

        private CampsiteResponse campsite;
        private RoomResponse room;
        private ReservationResponse reservation;
        private CampsiteLocationResponse campsiteLocation;
    }

    @Builder
    @Getter
    public static class CampsiteResponse {
        private Long campsiteId;
        private String address;
        private String thumbnailImageUrl;
    }

    @Builder
    @Getter
    public static class RoomResponse {
        private Long roomId;
        private String roomName;
        private String supplyList;
    }

    @Builder
    @Getter
    public static class ReservationResponse {
        private Long reservationId;
        private Integer headCnt;
        private Integer price;
        private LocalDate startDate;
        private LocalDate endDate;
        private String status;
    }

    @Builder
    @Getter
    public static class CampsiteLocationResponse {
        private Double mapX;
        private Double mapY;
    }

}
