package com.d106.campu.review.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ReviewExceptionCode implements ExceptionCode {

    /* Not found exception */
    REVIEW_NOT_FOUND("REVIEW401", "Not found review");

    private final String code;
    private final String message;

}
