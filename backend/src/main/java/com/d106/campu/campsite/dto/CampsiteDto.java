package com.d106.campu.campsite.dto;

import com.d106.campu.user.domain.jpa.User;
import lombok.Builder;
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
        /* TODO: 추가할 정보
         *  private int price;  // 가장 저렴한 방 가격
         *  private float rate; // 별점
         *  private float mapX; // 경도
         *  private float mapY; // 위도
         */

    }

    @Data
    @Builder
    public static class CreateRequest {

        private User user;
        private String facltNm;
        private String facltDivNm;
        private String tel;
        private String lineIntro;
        private String intro;
        private int allar;
        private String bizrno;
        private String trsagntNo;
        private String doNm;
        private String sigunguNm;
        private String addr1;
        private String addr2;
        private String indutyList;
        private String thumbnailImageUrl;
        private String mapImageUrl;
        private String homepage;
        private int sitedStnc;
        private String animalCmgCl;

    }

}
