package com.d106.campu.auth.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AuthExceptionCode implements ExceptionCode {

    /* Conflict Exception */
    CONFLICT_TEL("AUTH401", "Tel already exists"),

    /* Too Many Request Exception */
    TOO_MANY_REQUEST_TEL_SEND("AUTH501", "Limits for tel authorization sending");

    private final String code;
    private final String message;

}
