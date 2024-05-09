package com.d106.campu.emptynotification.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EmptyNotificationExceptionCode implements ExceptionCode {

    /* Conflict exception */
    CONFLICT_EMPTY_NOTIFICATION("EMPTY_NOTIFICATION401", "Conflict empty notification"),

    /* Too many request exception */
    TOO_MANY_REQUEST_EMPTY_NOTIFICATION("EMPTY_NOTIFICATION501", "Exceed empty notification limit");

    private final String code;
    private final String message;

}
