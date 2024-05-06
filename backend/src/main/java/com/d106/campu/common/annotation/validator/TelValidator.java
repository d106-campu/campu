package com.d106.campu.common.annotation.validator;

import com.d106.campu.auth.constant.RegExpression;
import com.d106.campu.common.annotation.Tel;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class TelValidator implements ConstraintValidator<Tel, String> {

    private static final Pattern TEL_PATTERN = Pattern.compile(RegExpression.tel);

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.trim().isEmpty()) {
            return false;
        }

        return TEL_PATTERN.matcher(value).matches();
    }

}
