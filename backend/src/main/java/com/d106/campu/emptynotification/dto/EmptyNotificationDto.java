package com.d106.campu.emptynotification.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Data;

public class EmptyNotificationDto {

    @Data
    public static class CreateRequest {

        @NotNull
        private Long roomId;

        @NotNull
        private LocalDate startDate;

        @NotNull
        private LocalDate endDate;
    }

}
