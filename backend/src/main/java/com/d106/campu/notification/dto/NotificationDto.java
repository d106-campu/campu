package com.d106.campu.notification.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

public class NotificationDto {

    @Data
    public static class SendResponse {

        private Long notificationId;
        private String message;
        private String name;
        private String date;
        private String no;
        private String url;
        private LocalDateTime createTime;

    }

    @Data
    public static class SaveResponse {

        private Long userId;
        private String tel;
        private Long notificationId;
        private String message;
        private String name;
        private String date;
        private String no;
        private String url;
        private LocalDateTime createTime;

    }

    @Data
    public static class SaveRequest {

        @NotNull
        private Long userId;

        @NotBlank
        private String content;

    }

    @Data
    public static class PublishEventRequest {

        @NotNull
        private Long userId;

        private String campsiteId;
        private String campsiteName;
        private String roomName;
        private LocalDate startDate;
        private LocalDate endDate;
        private int baseNo;
        private int maxNo;

    }

    @Data
    public static class ListResponse {

        private Long notificationId;
        private String message;
        private String name;
        private String date;
        private String no;
        private String url;
        private LocalDateTime createTime;

    }

}
