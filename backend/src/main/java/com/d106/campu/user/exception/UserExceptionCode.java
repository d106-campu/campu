package com.d106.campu.user.exception;

import com.d106.campu.common.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserExceptionCode implements ExceptionCode {

    INVALID_LOGIN("USER001", "Invalid account or password");

    private final String code;
    private final String message;

}
