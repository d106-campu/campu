package com.d106.campu.common.exception.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CommonExceptionCode implements ExceptionCode {

    /* Invalid Request Exception */
    INVALID_PARAM("COMMON001", "Invalid param"),

    /* UnAuthorized Exception */
    UNAUTHORIZED("COMMON101", "Unauthorized"),
    NO_TOKEN("COMMON102", "No Token"),

    /* Inaccessible Exception */
    INACCESSIBLE_DATA("COMMON201", "Inaccessible data"),

    /* Server Error */
    SERVER_ERROR("SERVER", "Server error");

    private final String code;
    private final String message;

}
