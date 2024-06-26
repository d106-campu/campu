package com.d106.campu.common.annotation.validator;

import com.d106.campu.auth.constant.RegExpression;
import com.d106.campu.common.annotation.Nickname;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class NicknameValidator implements ConstraintValidator<Nickname, String> {

    private static final Pattern NICKNAME_PATTERN = Pattern.compile(RegExpression.nickname);

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return NICKNAME_PATTERN.matcher(value).matches();
    }

}
