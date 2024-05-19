package com.d106.campu.user.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserExceptionCode implements ExceptionCode {

    /* Invalid Request Exception */
    INVALID_LOGIN("USER001", "Invalid account or password"),

    /* UnAuthorized Exception */
    CURRENT_PASSWORD_UNAUTHORIZED("USER101", "Invalid account or password"),

    /* Not found exception */
    USER_NOT_FOUND("USER201", "Invalid user"),

    /* Conflict exception */
    NICKNAME_CONFLICT("USER401", "Conflict nickname"),
    TEL_CONFLICT("USER402", "Conflict tel"),
    CURRENT_PASSWORD_NOT_MATCH("USER403", "Invalid current password"),
    CHANGE_PASSWORD_NOT_MATCH("USER404", "Not match change password and password check");

    private final String code;
    private final String message;

}
