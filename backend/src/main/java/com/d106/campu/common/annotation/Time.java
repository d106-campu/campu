package com.d106.campu.common.annotation;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

import com.d106.campu.common.annotation.validator.TimeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = TimeValidator.class)
@Documented
public @interface Time {

    String message() default "Invalid time";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
