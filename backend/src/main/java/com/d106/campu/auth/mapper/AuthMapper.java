package com.d106.campu.auth.mapper;

import com.d106.campu.auth.dto.AuthDto;
import com.d106.campu.user.domain.jpa.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AuthMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "gender", ignore = true)
    @Mapping(target = "birthYear", ignore = true)
    @Mapping(target = "profileImageUrl", ignore = true)
    @Mapping(target = "deleteTime", ignore = true)
    @Mapping(target = "notificationList", ignore = true)
    @Mapping(target = "campsiteLikeList", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    User toUser(AuthDto.JoinRequest joinRequestDto);

}
