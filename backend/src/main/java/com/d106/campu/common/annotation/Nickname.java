package com.d106.campu.common.annotation;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

import com.d106.campu.common.annotation.validator.NicknameValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = NicknameValidator.class)
@Documented
public @interface Nickname {

    String message() default "Invalid nickname";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
