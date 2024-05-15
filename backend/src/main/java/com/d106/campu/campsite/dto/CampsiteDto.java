package com.d106.campu.campsite.dto;

import com.d106.campu.campsite.domain.jpa.CampsiteLocation;
import com.d106.campu.common.annotation.Tel;
import com.d106.campu.common.annotation.Time;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;
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
        private Long price;
        private Double score;

    }

    @Data
    @Builder
    public static class DetailResponse {

        private Long id;
        private UserDto.NameAndTel owner;
        private String facltNm;
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
        private List<String> indutyList;
        private List<String> themeList;
        private List<String> facltList;
        private double score;
        private CampsiteLocation campsiteLocation;
        private double sitedStnc;
        private String animalCmgCl;
        private int hit;
        private boolean like;
        private String homepage;
        private String thumbnailImageUrl;
        private String mapImageUrl;
        private List<String> campsiteImageUrlList;
        private String checkin;
        private String checkout;

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

        @Tel
        private String tel;

        @Size(max = 512)
        @Schema(description = "캠핑장 한 줄 소개")
        private String lineIntro;

        @Size(max = 2048)
        @Schema(description = "캠핑장 소개")
        private String intro;

        @Digits(integer = 11, fraction = 0)
        @Schema(description = "총 면적 (숫자만). 단위: m<super>2</super>")
        private int allar;

        @Size(max = 32)
        @Schema(description = "사업자 등록 번호")
        private String bizrno;

        @Size(max = 32)
        @Schema(description = "관광 사업자 번호")
        private String trsagntNo;

        @Size(max = 32)
        private String doNm;

        @Size(max = 64)
        private String sigunguNm;

        @Size(max = 512)
        @Schema(description = "주소")
        private String addr1;

        @Size(max = 512)
        @Schema(description = "상세 주소")
        private String addr2;

        @Size(max = 128)
        @Schema(description = "캠핑장 유형. '캠핑', '오토캠핑', '카라반', '글램핑'. 복수 가능(CSV형식).")
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
        @Schema(description = "사이트 간 거리 (숫자만). 단위: m")
        private int sitedStnc;

        @Size(max = 16)
        @Schema(description = "애완동물 동반 가능 여부. '불가능', '' / '가능', '가능(소형견)'")
        private String animalCmgCl;

        @Time
        @Parameter(required = false)
        @Schema(description = "입실 시각. <code>hh:mm</code> 형식.")
        private String checkin;

        @Time
        @Parameter(required = false)
        @Schema(description = "퇴실 시각. <code>hh:mm</code> 형식.")
        private String checkout;

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
