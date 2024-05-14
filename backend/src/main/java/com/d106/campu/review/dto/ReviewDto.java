package com.d106.campu.review.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Data;

public class ReviewDto {

    @Data
    public static class CreateRequest {

        @NotNull
        private Long reservationId;

        @Size(max = 200, message = "content max 200")
        private String content;

        private int score;
    }

    @Data
    @Builder
    public static class ScoreResponse {

        private String campsiteName;
        private List<String> indutyList;
        private double score;
    }

    @Data
    public static class Response {

        private Long id;
        private LocalDateTime createTime;
        private UserResponse user;
        private int score;
        private String content;
        private List<String> reviewImageList;
    }

    @Data
    public static class UserResponse {

        private String nickname;
        private String profileImageUrl;
    }

    @Data
    public static class ReviewImageResponse {

        private String url;
    }

    @Data
    public static class DetailResponse {

        private Long campsiteId;
        private String campsiteName;
        private List<String> indutyList;
        private Long reviewId;
        private LocalDateTime createTime;
        private UserResponse user;
        private int score;
        private String content;
        private LocalDate visitDate;
        private List<String> reviewImageList;
        private boolean mine;
    }

}
