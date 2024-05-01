package com.d106.campu.common.exception.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CommonExceptionCode implements ExceptionCode {

    INVALID_PARAM("COMMON001", "Invalid param"),

    /* Not found exception */
    USER_NOT_FOUND("COMMON011", "Invalid user");

    private final String code;
    private final String message;

}
