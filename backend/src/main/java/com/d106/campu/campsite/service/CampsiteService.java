package com.d106.campu.campsite.service;

import com.d106.campu.campsite.constant.GetCampsiteListEnum.Induty;
import com.d106.campu.campsite.constant.GetCampsiteListEnum.Theme;
import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.dto.CampsiteDto;
import com.d106.campu.campsite.mapper.CampsiteMapper;
import com.d106.campu.campsite.repository.jpa.CampsiteRepository;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.exception.code.CommonExceptionCode;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.repository.jpa.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CampsiteService {

    private final UserRepository userRepository;
    private final CampsiteRepository campsiteRepository;
    private final CampsiteMapper campsiteMapper;

    @Transactional(readOnly = true)
    public Page<CampsiteDto.Response> getCampsiteList(Pageable pageable, String induty, String theme) {
        /* TODO: refactor: querydsl의 BooleanBuilder 활용 */
        if (induty == null && theme == null) {
            return campsiteRepository.findAll(pageable).map(campsiteMapper::toCampsiteListResponseDto);
        } else if (induty != null && !induty.isBlank()) {
            return campsiteRepository.findByIndutyListContaining(pageable, Induty.of(induty).getValue())
                .map(campsiteMapper::toCampsiteListResponseDto);
        } else if (theme != null && !theme.isBlank()) {
            return campsiteRepository.findByCampsiteThemeList_Theme_Theme(pageable, Theme.of(theme).getValue())
                .map(campsiteMapper::toCampsiteListResponseDto);
        }
        return null;
    }

    @Transactional
    public CampsiteDto.CreateResponse createCampsite(CampsiteDto.CreateRequest createRequestDto) throws NotFoundException {
        /* TODO: Replace this with login user (using securityHelper)
        User user = userRepository.findByAccount(securityHelper.getLoginUserAccount())
            .orElseThrow(() -> new NotFoundException());*/
        User user = userRepository.findById(2L)
            .orElseThrow(() -> new NotFoundException(CommonExceptionCode.USER_NOT_FOUND));

        /* TODO: Block if the login user does not have owner authority */

        Campsite campsite = campsiteMapper.toCampsite(createRequestDto);
        campsite.setUser(user);

        return campsiteMapper.toCreateResponseDto(campsiteRepository.save(campsite));
    }

}
