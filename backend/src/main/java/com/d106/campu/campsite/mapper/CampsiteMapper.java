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
    @Mapping(target = "campsiteImageList", ignore = true)
    @Mapping(target = "roomList", ignore = true)
    @Mapping(target = "like", ignore = true)
    @Mapping(target = "available", ignore = true)
    @Mapping(target = "price", ignore = true)
    @Mapping(target = "score", ignore = true)
    @Mapping(target = "campsiteFcltyList", ignore = true)
    @Mapping(source = "checkin", target = "checkin", conditionExpression = "java(createRequestDto.getCheckin() != null)")
    @Mapping(source = "checkout", target = "checkout", conditionExpression = "java(createRequestDto.getCheckin() != null)")
    Campsite toCampsite(CampsiteDto.CreateRequest createRequestDto);

}
