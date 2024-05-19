package com.d106.campu.room.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoomExceptionCode implements ExceptionCode {

    /* Not Found Exception */
    NOT_FOUND_ROOM("ROOM301", "Not found room");

    private final String code;
    private final String message;

}
