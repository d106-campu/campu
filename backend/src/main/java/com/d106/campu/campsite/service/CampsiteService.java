package com.d106.campu.campsite.service;

import com.d106.campu.campsite.constant.GetCampsiteListEnum.Induty;
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
    public Page<Response> getCampsiteList(Pageable pageable, String induty, String theme) {
        /* TODO: refactor: querydsl의 BooleanBuilder 활용 */
        if (induty == null && theme == null) {
            return campsiteRepository.findAll(pageable).map(campsiteMapper::toCampsiteListResponseDto);
        } else if (induty != null && !induty.isBlank()) {
            return campsiteRepository.findByIndutyListContaining(pageable, Induty.of(induty).getValue())
                .map(campsiteMapper::toCampsiteListResponseDto);
        }
        /* TODO: 캠핑장 테마별 조회 지원하려면 `campsite_theme` 테이블 join 필요
        else if (theme != null && !theme.isBlank()) {
            return campsiteRepository.findByThemeListContaining(pageable, Theme.of(theme).getValue())
                .map(campsiteMapper::toCampsiteListResponseDto);
        }*/

        return null;
    }

}
