package com.d106.campu.health.mapper;

import com.d106.campu.health.domain.jpa.CampsiteOriginal;
import com.d106.campu.health.dto.HealthDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HealthMapper {

    HealthDto.CampsiteOriginalResponse toCampsiteOriginalResponseDto(CampsiteOriginal campsiteOriginal);

}
