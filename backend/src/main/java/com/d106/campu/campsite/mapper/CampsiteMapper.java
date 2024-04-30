package com.d106.campu.campsite.mapper;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.dto.CampsiteDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CampsiteMapper {

    CampsiteDto.Response toCampsiteListResponseDto(Campsite campsite);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "hit", ignore = true)
    Campsite toCampsite(CampsiteDto.CreateRequest createRequest);

}
