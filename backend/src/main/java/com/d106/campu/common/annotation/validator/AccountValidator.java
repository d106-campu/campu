package com.d106.campu.common.annotation.validator;

import com.d106.campu.auth.constant.RegExpression;
import com.d106.campu.common.annotation.Account;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class AccountValidator implements ConstraintValidator<Account, String> {

    private static final Pattern ACCOUNT_PATTERN = Pattern.compile(RegExpression.account);

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return ACCOUNT_PATTERN.matcher(value).matches();
    }

}
