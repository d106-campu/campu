package com.d106.campu.image.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ImageExceptionCode implements ExceptionCode {

    /* Invalid Request Exception */
    IMAGE_FAIL_SAVE("IMAGE001", "Failed to save image");

    private final String code;
    private final String message;

}

