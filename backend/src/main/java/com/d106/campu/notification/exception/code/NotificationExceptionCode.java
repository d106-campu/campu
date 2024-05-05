package com.d106.campu.notification.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NotificationExceptionCode implements ExceptionCode {

    /* Invalid Request Exception */
    INVALID_CONNECTION("NOTIFICATION001", "Invalid connection"),
    FAIL_SEND("NOTIFICATION002", "Fail to send notification");

    private final String code;
    private final String message;

}
