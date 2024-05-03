package com.d106.campu.common.exception.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CommonExceptionCode implements ExceptionCode {

    /* Invalid Request Exception */
    INVALID_PARAM("COMMON001", "Invalid param");

    private final String code;
    private final String message;

}
