package com.d106.campu.image.dto;

import lombok.Data;

public class ImageDto {

    @Data
    public static class ProfileResponse {

        private String profileImageUrl;

    }

    @Data
    public static class ThumbnailResponse {

        private String thumbnailImageUrl;

    }

    @Data
    public static class MapResponse {

        private String mapImageUrl;

    }

    @Data
    public static class RoomResponse {

        private String roomImageUrl;

    }

}
