package com.d106.campu.user.mapper;

import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.dto.UserDto.ProfileResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    ProfileResponse toProfileResponseDto(User user);

}
