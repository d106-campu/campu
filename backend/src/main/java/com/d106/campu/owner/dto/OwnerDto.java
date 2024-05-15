package com.d106.campu.owner.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;
import lombok.Builder;
import lombok.Data;

public class OwnerDto {

    @Data
    @Builder
    public static class CampsiteUpdateRequest {

        private Long campsiteId;

        @NotBlank(message = "not blank intro")
        private String intro;

        private List<String> themeList;
        private List<String> fcltyList;

    }

}
