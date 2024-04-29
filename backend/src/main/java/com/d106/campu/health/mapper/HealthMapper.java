package com.d106.campu.health.mapper;

import com.d106.campu.health.dto.HealthDto;
import com.d106.campu.health.entity.CampsiteOriginal;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HealthMapper {

    HealthDto.CampsiteOriginalResponse toCampsiteOriginalResponseDto(CampsiteOriginal campsiteOriginal);

}
