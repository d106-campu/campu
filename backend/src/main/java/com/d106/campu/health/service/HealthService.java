package com.d106.campu.health.service;

import com.d106.campu.health.dto.HealthDto;
import com.d106.campu.health.mapper.HealthMapper;
import com.d106.campu.health.repository.jpa.CampsiteOriginalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class HealthService {

    private final CampsiteOriginalRepository campsiteOriginalRepository;
    private final HealthMapper healthMapper;

    public HealthDto.CampsiteOriginalResponse getCampsiteOriginal(Long campsiteId) {
        return healthMapper.toCampsiteOriginalResponseDto(campsiteOriginalRepository.findById(campsiteId).orElse(null));
    }

}
