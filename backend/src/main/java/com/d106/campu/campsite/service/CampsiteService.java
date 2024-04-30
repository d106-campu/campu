package com.d106.campu.campsite.service;

import com.d106.campu.campsite.dto.CampsiteDto.Response;
import com.d106.campu.campsite.mapper.CampsiteMapper;
import com.d106.campu.campsite.repository.jpa.CampsiteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CampsiteService {

    private final CampsiteRepository campsiteRepository;
    private final CampsiteMapper campsiteMapper;

    @Transactional(readOnly = true)
    public Page<Response> getCampsiteList(Pageable pageable) {
        return campsiteRepository.findAll(pageable).map(campsiteMapper::toCampsiteListResponseDto);
    }

}
