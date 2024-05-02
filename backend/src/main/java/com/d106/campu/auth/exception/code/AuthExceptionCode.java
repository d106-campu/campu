package com.d106.campu.auth.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AuthExceptionCode implements ExceptionCode {

    CONFLICT_TEL("TEL009", "Tel already exists"),
    TOO_MANY_REQUEST_TEL_SEND("TEL029", "Limits for tel authorization sending");

    private final String code;
    private final String message;

}
