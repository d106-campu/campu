package com.d106.campu.auth.service;

import com.d106.campu.auth.constant.AuthConstant;
import com.d106.campu.auth.domain.redis.TelHash;
import com.d106.campu.auth.exception.code.AuthExceptionCode;
import com.d106.campu.auth.repository.redis.TelHashRepository;
import com.d106.campu.common.exception.ConflictException;
import com.d106.campu.common.exception.TooManyException;
import com.d106.campu.common.util.RandomGenerator;
import com.d106.campu.user.repository.jpa.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final TelHashRepository telHashRepository;

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

        TelHash telHash = telHashRepository.findById(tel).orElse(getInitialEmailHash(tel));

        int authorizationCode = RandomGenerator.createAuthorizationCode();

        // TODO : send authorization code to tel

        telHash.increaseCountAndSetAuthorizationCode(authorizationCode);

        telHashRepository.save(telHash);
    }

    private TelHash getInitialEmailHash(String tel) {
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
