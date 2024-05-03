package com.d106.campu.auth.service;

import com.d106.campu.auth.constant.AuthConstant;
import com.d106.campu.auth.domain.redis.TelHash;
import com.d106.campu.auth.domain.redis.TelVerifyHash;
import com.d106.campu.auth.dto.AuthDto.TelVerifyRequest;
import com.d106.campu.auth.exception.code.AuthExceptionCode;
import com.d106.campu.auth.repository.redis.TelHashRepository;
import com.d106.campu.auth.repository.redis.TelVerifyHashRepository;
import com.d106.campu.common.exception.ConflictException;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.exception.TooManyException;
import com.d106.campu.common.util.RandomGenerator;
import com.d106.campu.common.util.SmsUtil;
import com.d106.campu.user.repository.jpa.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final TelHashRepository telHashRepository;
    private final TelVerifyHashRepository telVerifyHashRepository;
    private final SmsUtil smsUtil;

    @Transactional(readOnly = true)
    public boolean checkAvailableAccount(String account) {
        return userRepository.findByAccount(account).isEmpty();
    }

    @Transactional(readOnly = true)
    public boolean checkAvailableNickname(String nickname) {
        return userRepository.findByNicknameAndDeleteTimeIsNull(nickname).isEmpty();
    }

    @Transactional(readOnly = true)
    public boolean checkAvailableTel(String tel) {
        return userRepository.findByTelAndDeleteTimeIsNull(tel).isEmpty();
    }

    @Transactional
    public void sendAuthorizationCode(String tel) {
        checkExistedTel(tel);
        checkTelSendLimit(tel);

        TelHash telHash = telHashRepository.findById(tel).orElse(getInitialTelHash(tel));

        int authorizationCode = RandomGenerator.createAuthorizationCode();
        smsUtil.sendOne(tel, authorizationCode);

        telHash.increaseCountAndSetAuthorizationCode(authorizationCode);

        telHashRepository.save(telHash);
    }

    @Transactional
    public boolean verifyAuthorizationCode(TelVerifyRequest telVerifyRequestDto) {
        checkExistedTel(telVerifyRequestDto.getTel());

        TelHash telHash = telHashRepository.findById(telVerifyRequestDto.getTel())
            .orElseThrow(() -> new NotFoundException(AuthExceptionCode.NOT_FOUND_TEL));

        TelVerifyHash telVerifyHash = telVerifyHashRepository.findById(telHash.getTel())
            .orElse(getInitialTelVerifyHash(telVerifyRequestDto.getTel()));

        boolean authCheck = telHash.getAuthorizationCode() == telVerifyRequestDto.getAuthorizationCode();

        telVerifyHash.setAuthCheck(authCheck);
        telVerifyHashRepository.save(telVerifyHash);

        return authCheck;
    }

    private TelVerifyHash getInitialTelVerifyHash(String tel) {
        return TelVerifyHash.builder()
            .tel(tel)
            .build();
    }

    private TelHash getInitialTelHash(String tel) {
        return TelHash.builder()
            .tel(tel)
            .build();
    }

    private void checkTelSendLimit(String tel) {
        telHashRepository.findById(tel)
            .ifPresent(telHash -> {
                if (telHash.getCount() >= AuthConstant.TEL_SEND_LIMIT) {
                    throw new TooManyException(AuthExceptionCode.TOO_MANY_REQUEST_TEL_SEND);
                }
            });
    }

    private void checkExistedTel(String tel) {
        userRepository.findByTelAndDeleteTimeIsNull(tel)
            .ifPresent(user -> {
                throw new ConflictException(AuthExceptionCode.CONFLICT_TEL);
            });
    }

}
