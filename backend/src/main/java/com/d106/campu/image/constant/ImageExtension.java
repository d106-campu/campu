package com.d106.campu.image.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ImageExtension {

    JPG("jpg", new String[]{"image/jpg", "image/jpeg"}),
    PNG("png", new String[]{"image/png"}),
    GIF("gif", new String[]{"image/gif"}),
    BMP("bmp", new String[]{"image/bmp"}),
    ;

    private final String imageExtensionLowerCase;
    private final String[] imageMimeTypeList;

}