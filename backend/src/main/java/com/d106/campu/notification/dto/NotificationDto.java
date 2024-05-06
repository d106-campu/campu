package com.d106.campu.notification.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

public class NotificationDto {

    @Data
    @Builder
    public static class SendRequest {

        @NotNull
        private Long userId;

        @NotNull
        private Long notificationId;

        @NotBlank
        private String content;

    }

    @Data
    public static class SendResponse {

        private Long notificationId;
        private String content;

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

        @NotBlank
        private String content;

    }

    @Data
    public static class ListResponse {

        private Long notificationId;
        private String content;

    }

}
