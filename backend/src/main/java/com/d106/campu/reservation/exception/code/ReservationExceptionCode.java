package com.d106.campu.reservation.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ReservationExceptionCode implements ExceptionCode {

    /* UnAuthorized exception */
    USER_NOT_MATCH("RESERVATION101", "Not match reservation user and login user"),

    /* Not found exception */
    RESERVATION_NOT_FOUND("RESERVATION401", "Not found reservation");

    private final String code;
    private final String message;

}
