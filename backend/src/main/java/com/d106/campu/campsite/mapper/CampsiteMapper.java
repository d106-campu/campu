package com.d106.campu.campsite.mapper;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.dto.CampsiteDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CampsiteMapper {

    CampsiteDto.Response toCampsiteListResponseDto(Campsite campsite);

    CampsiteDto.CreateResponse toCreateResponseDto(Campsite campsite);

    CampsiteDto.LikeResponse toCampsiteLikeResponseDto(Boolean like);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "hit", ignore = true)
    @Mapping(target = "campsiteThemeList", ignore = true)
    @Mapping(target = "campsiteLocation", ignore = true)
    @Mapping(target = "campsiteLikeList", ignore = true)
    @Mapping(target = "roomList", ignore = true)
    @Mapping(target = "like", ignore = true)
    @Mapping(target = "available", ignore = true)
    Campsite toCampsite(CampsiteDto.CreateRequest createRequestDto);

}
