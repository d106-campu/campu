package com.d106.campu.image.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ImageExceptionCode implements ExceptionCode {

    /* Invalid Request Exception */
    IMAGE_SAVE_FAIL("IMAGE001", "Failed to save image"),
    DIR_CREATE_FAIL("IMAGE002", "Failed to create directory");

    private final String code;
    private final String message;

}

