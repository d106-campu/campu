package com.d106.campu.reservation.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ReservationExceptionCode implements ExceptionCode {

    /* UnAuthorized exception */
    USER_NOT_MATCH("RESERVATION101", "Not match reservation user and login user"),
    RESERVATION_FAIL_EX("RESERVATION102", "Reservation preparation fail by exception"),
    RESERVATION_FAIL_CODE("RESERVATION103", "Reservation preparation fail by code"),
    CANCEL_FAIL_EX("RESERVATION104", "Reservation cancel fail by exception"),
    CANCEL_FAIL_CODE("RESERVATION105", "Reservation cancel fail by code"),

    /* Not found exception */
    RESERVATION_NOT_FOUND("RESERVATION401", "Not found reservation");

    private final String code;
    private final String message;

}
