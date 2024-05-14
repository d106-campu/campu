package com.d106.campu.owner.exception.code;

import com.d106.campu.common.exception.code.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum OwnerExceptionCode implements ExceptionCode {

    /* Not found exception */
    BIZRNO_NOT_FOUND("OWNER401", "Bizrno not found"),

    /* Conflict exception */
    OWNED_BIZRNO("OWNER501", "Duplicated bizrno ");

    private final String code;
    private final String message;

}
