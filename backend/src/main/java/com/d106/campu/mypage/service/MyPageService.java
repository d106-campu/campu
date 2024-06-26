package com.d106.campu.mypage.service;

import com.d106.campu.auth.exception.code.AuthExceptionCode;
import com.d106.campu.auth.repository.redis.TelVerifyHashRepository;
import com.d106.campu.common.exception.ConflictException;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.exception.UnauthorizedException;
import com.d106.campu.common.util.SecurityHelper;
import com.d106.campu.emptynotification.mapper.EmptyNotificationMapper;
import com.d106.campu.emptynotification.repository.jpa.EmptyNotificationRepository;
import com.d106.campu.mypage.constant.DateType;
import com.d106.campu.mypage.constant.UseType;
import com.d106.campu.mypage.dto.MyPageDto.MyCampsiteResponse;
import com.d106.campu.mypage.dto.MyPageDto.MyEmptyNotificationResponse;
import com.d106.campu.mypage.dto.MyPageDto.MyReservationResponse;
import com.d106.campu.mypage.dto.MyPageDto.MyReviewResponse;
import com.d106.campu.mypage.dto.MyPageDto.PasswordChangeRequest;
import com.d106.campu.mypage.repository.MyPageRepository;
import com.d106.campu.user.constant.GenderType;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.dto.UserDto;
import com.d106.campu.user.exception.code.UserExceptionCode;
import com.d106.campu.user.mapper.UserMapper;
import com.d106.campu.user.repository.jpa.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MyPageService {

    private final MyPageRepository myPageRepository;
    private final UserRepository userRepository;
    private final TelVerifyHashRepository telVerifyHashRepository;
    private final EmptyNotificationRepository emptyNotificationRepository;
    private final UserMapper userMapper;
    private final EmptyNotificationMapper emptyNotificationMapper;
    private final PasswordEncoder passwordEncoder;
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
    public Page<MyCampsiteResponse> getCampsiteList(Pageable pageable) {
        return myPageRepository.getCampsiteList(pageable, securityHelper.getLoginAccount());
    }

    @Transactional(readOnly = true)
    public List<MyEmptyNotificationResponse> getEmptyNotificationList() {
        return emptyNotificationMapper.toMyEmptyNotificationResponseDto(
            emptyNotificationRepository.findByUser_Account(securityHelper.getLoginAccount()));
    }

    @Transactional(readOnly = true)
    public UserDto.ProfileResponse getProfile() {
        return userMapper.toProfileResponseDto(getUserByAccount());
    }

    @Transactional
    public void updateNickname(String nickname) {
        checkExistedNickname(nickname);
        User user = getUserByAccount();

        user.changeNickname(nickname);
    }

    @Transactional
    public void updateTel(String tel) {
        checkExistedTel(tel);
        checkAuthorization(tel);

        User user = getUserByAccount();

        user.changeTel(tel);
    }

    @Transactional
    public void updatePassword(PasswordChangeRequest passwordChangeRequestDto) {
        User user = getUserByAccount();

        verifyCurrentPassword(passwordChangeRequestDto.getCurrentPassword(), user.getPassword());
        checkChangedPassword(passwordChangeRequestDto.getNewPassword(), passwordChangeRequestDto.getNewPasswordCheck());

        user.changePassword(passwordEncoder.encode(passwordChangeRequestDto.getNewPassword()));
    }

    @Transactional
    public void updateEtcInfo(GenderType gender, String birthYear) {
        User user = getUserByAccount();

        user.changeEtcInfo(gender, birthYear);
    }

    private void checkChangedPassword(String changedPassword, String checkChangePassword) {
        if (!changedPassword.equals(checkChangePassword)) {
            throw new UnauthorizedException(UserExceptionCode.CHANGE_PASSWORD_NOT_MATCH);
        }
    }

    private void verifyCurrentPassword(String requestPassword, String password) {
        if (!passwordEncoder.matches(requestPassword, password)) {
            throw new UnauthorizedException(UserExceptionCode.CURRENT_PASSWORD_NOT_MATCH);
        }
    }

    private void checkAuthorization(String tel) {
        telVerifyHashRepository.findById(tel)
            .map(telVerifyHash -> {
                if (!telVerifyHash.isAuthCheck()) {
                    throw new UnauthorizedException(AuthExceptionCode.UNAUTHORIZED_TEL);
                }
                return telVerifyHash;
            }).orElseThrow(() -> new UnauthorizedException(AuthExceptionCode.UNAUTHORIZED_TEL));
    }

    private void checkExistedTel(String tel) {
        userRepository.findByTelAndDeleteTimeIsNull(tel)
            .ifPresent(user -> {
                throw new ConflictException(UserExceptionCode.TEL_CONFLICT);
            });
    }

    private void checkExistedNickname(String nickname) {
        userRepository.findByNicknameAndDeleteTimeIsNull(nickname)
            .ifPresent(user -> {
                throw new ConflictException(UserExceptionCode.NICKNAME_CONFLICT);
            });
    }

    private User getUserByAccount() {
        return userRepository.findByAccount(securityHelper.getLoginAccount())
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
    }

}
