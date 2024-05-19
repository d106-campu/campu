package com.d106.campu.image.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;

public class ImageDto {

    @Data
    public static class UploadListRequest {

        private List<Long> imageIdList;

    }

    @Data
    @Builder
    public static class UploadListResponse {

        private Long imageId;
        private String url;

    }

}
