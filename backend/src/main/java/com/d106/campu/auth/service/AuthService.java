package com.d106.campu.auth.service;

import com.d106.campu.user.repository.UserRepository;
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

}
