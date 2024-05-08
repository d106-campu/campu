package com.d106.campu.user.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserExceptionCode implements ExceptionCode {

    /* Invalid Request Exception */
    INVALID_LOGIN("USER001", "Invalid account or password"),

    /* Not found exception */
    USER_NOT_FOUND("USER201", "Invalid user"),

    /* Conflict exception */
    NICKNAME_CONFLICT("USER401", "Conflict nickname"),
    TEL_CONFLICT("USER402", "Conflict tel");

    private final String code;
    private final String message;

}
