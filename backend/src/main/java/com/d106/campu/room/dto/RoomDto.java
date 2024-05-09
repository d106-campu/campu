package com.d106.campu.room.dto;

import com.d106.campu.campsite.dto.CampsiteDto;
import lombok.Data;

public class RoomDto {

    @Data
    public static class Response {

        private Long id;
        private String name;
        private String induty;
        private int baseNo;
        private int maxNo;
        private int price;
        private int extraPrice;
        private int roomCnt;
        private int toiletCnt;
        private String supplyList;
        private boolean available;
        private String imageUrl;

    }

    @Data
    public static class RoomInfo {

        private Long id;
        private CampsiteDto.CampsiteInfo campsite;
        private String name;

    }

}
