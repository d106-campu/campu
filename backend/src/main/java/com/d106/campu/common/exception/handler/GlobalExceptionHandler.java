package com.d106.campu.common.exception.handler;

import com.d106.campu.common.exception.ConflictException;
import com.d106.campu.common.exception.TooManyException;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.exception.code.CommonExceptionCode;
import com.d106.campu.common.response.Response;
import com.d106.campu.common.response.ResponseFail;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = {MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public Response handleParamsException(Exception e) {
        return new ResponseFail(CommonExceptionCode.INVALID_PARAM.getCode(), e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    @ExceptionHandler(value = {NotFoundException.class})
    public Response handleNotFoundException(NotFoundException e) {
        return new ResponseFail(e.getExceptionCode().getCode(), e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.CONFLICT)
    @ExceptionHandler(value = ConflictException.class)
    public Response handleConflictException(ConflictException e) {
        return new ResponseFail(e.getExceptionCode().getCode(), e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.TOO_MANY_REQUESTS)
    @ExceptionHandler(value = TooManyException.class)
    public Response handleTooManyException(TooManyException e) {
        return new ResponseFail(e.getExceptionCode().getCode(), e.getMessage());
    }

}
