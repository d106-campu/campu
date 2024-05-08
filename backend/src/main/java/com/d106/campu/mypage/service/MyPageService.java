package com.d106.campu.mypage.service;

import com.d106.campu.common.util.SecurityHelper;
import com.d106.campu.mypage.constant.DateType;
import com.d106.campu.mypage.constant.UseType;
import com.d106.campu.mypage.dto.MyPageDto.MyReservationResponse;
import com.d106.campu.mypage.dto.MyPageDto.MyReviewResponse;
import com.d106.campu.mypage.repository.MyPageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MyPageService {

    private final MyPageRepository myPageRepository;
    private final SecurityHelper securityHelper;

    @Transactional(readOnly = true)
    public Page<MyReservationResponse> getReservationList(Pageable pageable, DateType dateType, UseType useType) {
        return myPageRepository.getReservationList(pageable, securityHelper.getLoginAccount(), dateType, useType);
    }

    @Transactional(readOnly = true)
    public Page<MyReviewResponse> getReviewList(Pageable pageable, DateType dateType) {
        return myPageRepository.getReviewList(pageable, securityHelper.getLoginAccount(), dateType);
    }

    @Transactional(readOnly = true)
    public Object getCampsiteList(Pageable pageable) {
        return myPageRepository.getCampsiteList(pageable, securityHelper.getLoginAccount());
    }

}
