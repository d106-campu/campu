package com.d106.campu.campsite.dto;

import com.d106.campu.auth.constant.RegExpression;
import com.d106.campu.campsite.domain.jpa.CampsiteLocation;
import com.d106.campu.user.domain.jpa.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

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
        private CampsiteLocation campsiteLocation;
        private boolean like;
        /* TODO: 추가할 정보
         *  private int price;          // 가장 저렴한 방 가격
         *  private float rate;         // 별점
         *  private boolean available;  // 예약 가능 여부
         */

    }

    @Data
    @Builder
    public static class CreateRequest {

        @JsonIgnore
        private User user;

        @NotBlank
        @Size(max = 128)
        private String facltNm;

        @Size(max = 16)
        private String facltDivNm;

        @Pattern(regexp = RegExpression.tel)
        private String tel;

        @Size(max = 512)
        private String lineIntro;

        @Size(max = 2048)
        private String intro;

        @Digits(integer = 11, fraction = 0)
        private int allar;

        @Size(max = 32)
        private String bizrno;

        @Size(max = 32)
        private String trsagntNo;

        @Size(max = 32)
        private String doNm;

        @Size(max = 64)
        private String sigunguNm;

        @Size(max = 512)
        private String addr1;

        @Size(max = 512)
        private String addr2;

        @Size(max = 128)
        private String indutyList;

        @Size(max = 1024)
        @URL
        private String thumbnailImageUrl;

        @Size(max = 1024)
        @URL
        private String mapImageUrl;

        @Size(max = 1024)
        @URL
        private String homepage;

        @Digits(integer = 11, fraction = 0)
        private int sitedStnc;

        @Size(max = 16)
        private String animalCmgCl;

    }

    @Data
    public static class CreateResponse {

        private Long id;

    }

    @Data
    @Builder
    public static class LikeResponse {

        private boolean like;

    }

}
