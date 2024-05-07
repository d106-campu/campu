package com.d106.campu.mypage.dto;

import java.time.LocalDate;
import lombok.Data;

public class MyPageDto {

    @Data
    public static class ReservationResponse {

        private Long id;
        //        private String thumbnailImageUrl;
//        private String addr1;
        private int headCnt;
        private int price;
        private LocalDate startDate;
        private LocalDate endDate;
//        private Room room;
    }

}
