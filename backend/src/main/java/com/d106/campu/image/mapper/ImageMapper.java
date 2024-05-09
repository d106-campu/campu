package com.d106.campu.image.mapper;

import com.d106.campu.campsite.domain.jpa.CampsiteImage;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", imports = {StringUtils.class})
public interface ImageMapper {

    @Mapping(target = "url")
    @Mapping(target = "campsite", ignore = true)
    @Mapping(target = "id", ignore = true)
    CampsiteImage toCampsiteImage(String url);

    default String toUrl(String baseUrl, String url) {
        return StringUtils.join(baseUrl, url);
    }

}
