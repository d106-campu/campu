package com.d106.campu.image.mapper;

import com.d106.campu.campsite.domain.jpa.CampsiteImage;
import com.d106.campu.review.domain.jpa.ReviewImage;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", imports = {StringUtils.class})
public interface ImageMapper {

    @Mapping(target = "url")
    @Mapping(target = "campsite", ignore = true)
    @Mapping(target = "id", ignore = true)
    CampsiteImage toCampsiteImage(String url);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "review", ignore = true)
    ReviewImage toReviewImage(String url);

}
