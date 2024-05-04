package com.d106.campu.auth.dto;

import com.d106.campu.auth.constant.RegExpression;
import com.d106.campu.common.annotation.Account;
import com.d106.campu.common.annotation.Tel;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

public class AuthDto {

    @Data
    public static class TelVerifyRequest {

        @Tel
        String tel;

        int authorizationCode;
    }

    @Data
    public static class JoinRequest {

        @Account
        private String account;

        @Schema(example = "nick1")
        @NotBlank(message = "not blank")
        @Size(min = 2, max = 8, message = "nickname length not valid")
        @Pattern(regexp = RegExpression.nickname, message = "nickname format not valid")
        private String nickname;

        @Tel
        private String tel;

        @Schema(example = "abcd1234!")
        @NotBlank
        @Size(min = 8, max = 20)
        @Pattern(regexp = RegExpression.strongPassword)
        private String password;

        @Schema(example = "abcd1234!")
        @NotBlank
        @Size(min = 8, max = 20)
        @Pattern(regexp = RegExpression.strongPassword)
        private String passwordCheck;
    }

    @Data
    public static class LoginRequest {

        @Account
        private String account;

        @Schema(example = "abcd1234!")
        @NotBlank
        @Size(min = 8, max = 20)
        @Pattern(regexp = RegExpression.strongPassword)
        private String password;

    }

}
