package com.d106.campu.image.dto;

import com.d106.campu.common.annotation.Image;
import com.d106.campu.image.constant.ImageExtension;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

public class ImageDto {

    @Data
    public static class ProfileRequest {

        @Image(allowedExtensionList = {ImageExtension.JPG, ImageExtension.PNG, ImageExtension.GIF,
            ImageExtension.BMP}, message = "Invalid profile")
        private MultipartFile profile;

    }

    @Data
    public static class ProfileResponse {

        private String profileImageUrl;
        private String size;

    }

}
