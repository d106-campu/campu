package com.d106.campu.owner.service;

import com.d106.campu.auth.constant.RoleName;
import com.d106.campu.auth.exception.code.AuthExceptionCode;
import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.dto.CampsiteDto.Response;
import com.d106.campu.campsite.exception.code.CampsiteExceptionCode;
import com.d106.campu.campsite.mapper.CampsiteMapper;
import com.d106.campu.campsite.repository.jpa.CampsiteRepository;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.exception.UnauthorizedException;
import com.d106.campu.common.util.SecurityHelper;
import com.d106.campu.reservation.repository.jpa.QReservationRepository;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.exception.code.UserExceptionCode;
import com.d106.campu.user.repository.jpa.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class OwnerService {

    private final CampsiteRepository campsiteRepository;
    private final CampsiteMapper campsiteMapper;

    private final UserRepository userRepository;

    private final QReservationRepository qReservationRepository;

    private final SecurityHelper securityHelper;

    @Transactional(readOnly = true)
    public Page<Response> getOwnerCampsiteList(Pageable pageable) {
        return campsiteRepository.findByUser(pageable, getOwnerUser()).map(campsiteMapper::toCampsiteListResponseDto);
    }

    public Page getOwnerReservationListByCampsite(Long campsiteId, Pageable pageable) {
        Campsite campsite = campsiteRepository.findById(campsiteId).orElseThrow(() -> new NotFoundException(
            CampsiteExceptionCode.CAMPSITE_NOT_FOUND));
        return null;
    }

    private User getOwnerUser() {
        User user = userRepository.findByAccount(securityHelper.getLoginAccount())
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
        if (!user.getRole().equals(RoleName.OWNER)) {
            throw new UnauthorizedException(AuthExceptionCode.UNAUTHORIZED_USER);
        }
        return user;
    }

}
