package com.d106.campu.owner.dto;

import com.d106.campu.campsite.constant.IndutyEnum;
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

    @Data
    public static class RoomCreateRequest {

        private Long campsiteId;
        private IndutyEnum induty;
        private String roomName;
        private Long price;
        private int baseNo;
        private int maxNo;
        private Long extraPrice;
        private boolean toilet;

    }

    @Data
    public static class RoomUpdateRequest {

        private IndutyEnum induty;
        private String roomName;
        private Long price;
        private int baseNo;
        private int maxNo;
        private Long extraPrice;
        private boolean toilet;

    }

    @Data
    public static class RoomResponse {

        private Long roomId;
        private String imageUrl;
        private IndutyEnum induty;
        private String roomName;
        private int baseNo;
        private int maxNo;
        private Long price;
        private Long extraPrice;
        private boolean toilet;

    }

}
