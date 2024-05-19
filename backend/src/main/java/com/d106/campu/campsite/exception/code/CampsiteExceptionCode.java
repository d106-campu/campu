package com.d106.campu.campsite.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CampsiteExceptionCode implements ExceptionCode {

    /* Forbidden exception */
    FORBIDDEN_CAMPSITE("CAMPSITE201", "Forbidden campsite with no authority"),

    /* Not found exception */
    CAMPSITE_NOT_FOUND("CAMPSITE301", "Invalid campsite");

    private final String code;
    private final String message;

}
