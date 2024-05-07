package com.d106.campu.mypage.dto;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;

public class MyPageDto {

    @Builder
    @Getter
    public static class ReservationResponse {
        /* campsite */
        private Long campsiteId;
        private String address;
        private String thumbnailImageUrl;

        /* room */
        private Long roomId;
        private String roomName;
        private String supplyList;

        /* reservation */
        private Long reservationId;
        private Integer headCnt;
        private Integer price;
        private LocalDate startDate;
        private LocalDate endDate;
        private String status;

        /* campsite location */
        private Double mapX;
        private Double mapY;
    }

}
