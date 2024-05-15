package com.d106.campu.common.annotation.validator;

import com.d106.campu.auth.constant.RegExpression;
import com.d106.campu.common.annotation.Time;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class TimeValidator implements ConstraintValidator<Time, String> {

    private static final Pattern TIME_PATTERN = Pattern.compile(RegExpression.time);

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.trim().isEmpty()) {
            return true; // nullable parameter
        }

        return TIME_PATTERN.matcher(value).matches();
    }

}
