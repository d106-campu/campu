package com.d106.campu.auth.service;

import com.d106.campu.user.repository.jpa.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final UserRepository userRepository;

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

}
