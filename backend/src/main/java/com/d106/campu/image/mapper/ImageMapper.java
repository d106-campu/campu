package com.d106.campu.image.mapper;

import com.d106.campu.image.dto.ImageDto;
import com.d106.campu.user.domain.jpa.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    ImageDto.ProfileResponse toProfileResponseDto(User user);

}
