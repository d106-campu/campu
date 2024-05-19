package com.d106.campu.review.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ReviewExceptionCode implements ExceptionCode {

    /* Bad Request exception */
    FILE_COUNT_LIMIT("REVIEW001", "File count limit 5"),

    /* Unauthorized exception */
    UNAUTHORIZED_REVIEW("REVIEW101", "Unauthorized this review"),

    /* Not found exception */
    REVIEW_NOT_FOUND("REVIEW401", "Not found review"),

    /* Conflict exception */
    NOT_END_RESERVATION("REVIEW501", "Not end reservation"),
    ALREADY_REVIEW("REVIEW502", "Already Existed Review");

    private final String code;
    private final String message;

}
