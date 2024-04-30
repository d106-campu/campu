package com.d106.campu.common.exception;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UnauthorizedException extends RuntimeException {

    private final ExceptionCode exceptionCode;
    
    @Override
    public String getMessage() {
        return exceptionCode.getMessage();
    }

}
