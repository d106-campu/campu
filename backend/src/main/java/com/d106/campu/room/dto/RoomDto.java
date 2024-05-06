package com.d106.campu.room.dto;

import com.d106.campu.campsite.dto.CampsiteDto;
import lombok.Data;

public class RoomDto {

    @Data
    public static class ListResponse {

        private Long id;
        private CampsiteDto.IdAndName campsite;
        private String induty;
        private String name;
        private int baseNo;
        private int maxNo;
        private int price;
        private int extraPrice;
        private int roomCnt;
        private int toiletCnt;
        private String supplyList;
        /* TODO: private boolean available; // 예약 가능 여부 */

    }

}
