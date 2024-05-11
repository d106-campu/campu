package com.d106.campu.review.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

public class ReviewDto {

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

}
