package com.d106.campu.auth.dto;

import com.d106.campu.auth.constant.RegExpression;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

public class AuthDto {

    @Data
    public static class TelVerifyRequest {

        @NotBlank(message = "not blank")
        @Pattern(regexp = RegExpression.tel, message = "tel format not valid")
        String tel;

        int authorizationCode;
    }

}
