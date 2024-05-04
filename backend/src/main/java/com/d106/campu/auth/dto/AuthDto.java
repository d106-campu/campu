package com.d106.campu.auth.dto;

import com.d106.campu.auth.constant.RegExpression;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

public class AuthDto {

    @Data
    public static class TelVerifyRequest {

        @NotBlank(message = "not blank")
        @Pattern(regexp = RegExpression.tel, message = "tel format not valid")
        String tel;

        int authorizationCode;
    }

    @Data
    public static class JoinRequest {

        @Schema(example = "account1")
        @NotBlank(message = "not blank")
        @Size(min = 6, max = 12, message = "account length not valid")
        @Pattern(regexp = RegExpression.account, message = "account format not valid")
        private String account;

        @Schema(example = "nickname1")
        @NotBlank(message = "not blank")
        @Size(min = 2, max = 8, message = "nickname length not valid")
        @Pattern(regexp = RegExpression.nickname, message = "nickname format not valid")
        private String nickname;

        @Schema(example = "01011112222")
        @NotBlank(message = "not blank")
        @Pattern(regexp = RegExpression.tel, message = "tel format not valid")
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

}
