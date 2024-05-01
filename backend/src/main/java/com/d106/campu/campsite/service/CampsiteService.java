package com.d106.campu.campsite.service;

import com.d106.campu.campsite.dto.CampsiteDto;
import com.d106.campu.campsite.dto.CampsiteDto.Response;
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
    public Page<Response> getCampsiteList(Pageable pageable) {
        return campsiteRepository.findAll(pageable).map(campsiteMapper::toCampsiteListResponseDto);
    }

    @Transactional
    public Long createCampsite(CampsiteDto.CreateRequest createRequest) throws NotFoundException {
        /* TODO: Replace this with login user (using securityHelper)
        User user = userRepository.findByAccount(securityHelper.getLoginUserAccount())
            .orElseThrow(() -> new NotFoundException());*/
        User user = userRepository.findById(2L)
            .orElseThrow(() -> new NotFoundException(CommonExceptionCode.USER_NOT_FOUND));
        createRequest.setUser(user);

        return campsiteRepository.save(campsiteMapper.toCampsite(createRequest)).getId();
    }

}
