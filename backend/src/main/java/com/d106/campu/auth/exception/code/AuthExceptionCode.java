package com.d106.campu.auth.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AuthExceptionCode implements ExceptionCode {

    /* UnAuthorized Exception */
    UNAUTHORIZED_TEL_AUTHORIZATION_CODE("AUTH101", "Not match authorization code"),
    UNAUTHORIZED_TEL("AUTH102", "Not authorized tel"),

    /* NotFound Exception */
    NOT_FOUND_TEL("AUTH301", "Tel not found"),

    /* Conflict Exception */
    CONFLICT_ACCOUNT("AUTH401", "Tel already exists"),
    CONFLICT_NICKNAME("AUTH402", "Tel already exists"),
    CONFLICT_TEL("AUTH403", "Tel already exists"),

    /* Too Many Request Exception */
    TOO_MANY_REQUEST_TEL_SEND("AUTH501", "Limits for tel authorization sending");

    private final String code;
    private final String message;

}
