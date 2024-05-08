package com.d106.campu.image.mapper;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.image.dto.ImageDto;
import com.d106.campu.user.domain.jpa.User;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", imports = {StringUtils.class})
public interface ImageMapper {

    @Mapping(target = "profileImageUrl", expression = "java(StringUtils.join(baseUrl, user.getProfileImageUrl()))")
    ImageDto.ProfileResponse toProfileResponseDto(String baseUrl, User user);

    @Mapping(target = "thumbnailImageUrl", expression = "java(StringUtils.join(baseUrl, campsite.getThumbnailImageUrl()))")
    ImageDto.ThumbnailResponse toThumbnailResponseDto(String baseUrl, Campsite campsite);

    @Mapping(target = "mapImageUrl", expression = "java(StringUtils.join(baseUrl, campsite.getMapImageUrl()))")
    ImageDto.MapResponse toMapResponseDto(String baseUrl, Campsite campsite);

}
