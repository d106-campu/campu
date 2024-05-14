package com.d106.campu.user.dto;

import com.d106.campu.user.constant.GenderType;
import lombok.Builder;
import lombok.Data;

public class UserDto {

    @Data
    public static class ProfileResponse {

        private Long id;
        private String account;
        private String nickname;
        private GenderType gender;
        private String birthYear;
        private String profileImageUrl;
        private String tel;
    }

    @Data
    @Builder
    public static class NameAndTel {

        private String nickName;
        private String tel;

    }

}
