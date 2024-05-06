package com.d106.campu.auth.mapper;

import com.d106.campu.auth.dto.AuthDto.JoinRequest;
import com.d106.campu.auth.dto.AuthDto.LoginResponse;
import com.d106.campu.common.security.CustomUser;
import com.d106.campu.user.domain.jpa.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AuthMapper {

    String TO_USER_ROLE = "java(customUser.getAuthorities().isEmpty() ? null : customUser.getAuthorities().stream().toList().getFirst().getAuthority())";

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "gender", ignore = true)
    @Mapping(target = "birthYear", ignore = true)
    @Mapping(target = "profileImageUrl", ignore = true)
    @Mapping(target = "deleteTime", ignore = true)
    @Mapping(target = "campsiteLikeList", ignore = true)
    User toUser(JoinRequest joinRequestDto);

    @Mapping(target = "role", expression = TO_USER_ROLE)
    LoginResponse toLoginResponseDto(CustomUser customUser);

}
