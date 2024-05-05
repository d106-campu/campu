package com.d106.campu.notification.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

public class NotificationDto {

    @Data
    public static class SendRequest {

        @NotNull
        private Long userId;

        @NotBlank
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
    public static class publishEvent {

        @NotNull
        private Long userId;

        @NotBlank
        private String content;

    }

}
