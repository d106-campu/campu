package com.d106.campu.campsite.dto;

import com.d106.campu.auth.constant.RegExpression;
import com.d106.campu.campsite.domain.jpa.CampsiteLocation;
import com.d106.campu.user.domain.jpa.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.Map;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.URL;
import org.springframework.data.domain.Page;

public class CampsiteDto {

    @Data
    @Builder
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
        private boolean available;
        private Integer price;
        private Double score;

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

    @Data
    public static class CampsiteInfo {

        private Long id;
        private String facltNm;
        private String addr1;
        private String addr2;
        private String thumbnailImageUrl;

    }

    @SuperBuilder
    @Getter
    public static class CampsiteListResponse {

        public Page<CampsiteDto.Response> campsiteList;

        public CampsiteListResponse(Page<Response> campsiteList) {
            this.campsiteList = campsiteList;
        }

    }

    @SuperBuilder
    @Getter
    public static class CampsiteListWithCenterResponse extends CampsiteListResponse {

        public Map<String, CampsiteLocation> mapCoordinates;

        public CampsiteListWithCenterResponse(Page<Response> campsiteList, Map<String, CampsiteLocation> mapCoordinates) {
            super(campsiteList);
            this.mapCoordinates = mapCoordinates;
        }

    }

}
