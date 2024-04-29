package com.d106.campu.campsite.dto;

import lombok.Data;

public class CampsiteDto {

    @Data
    public static class Response {

        private Long id;
        private String facltNm;
        private String lineIntro;
        private String doNm;
        private String sigunguNm;
        private String addr1;
        private String addr2;
        private String thumbnailImageUrl;
        // TODO: 추가할 정보
        //  private int price;  // 가장 저렴한 방 가격
        //  private float rate; // 별점
        //  private float mapX; // 경도
        //  private float mapY; // 위도

    }

}
