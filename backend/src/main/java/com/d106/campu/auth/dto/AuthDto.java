package com.d106.campu.auth.dto;

import com.d106.campu.common.annotation.Account;
import com.d106.campu.common.annotation.Nickname;
import com.d106.campu.common.annotation.Password;
import com.d106.campu.common.annotation.Tel;
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

        @Nickname
        private String nickname;

        @Tel
        private String tel;

        @Password
        private String password;
        
        private String passwordCheck;
    }

    @Data
    public static class LoginRequest {

        @Account
        private String account;

        @Password
        private String password;
    }

    @Data
    public static class LoginResponse {

        private String nickname;
        private String profileImageUrl;
        private String role;
    }

}
