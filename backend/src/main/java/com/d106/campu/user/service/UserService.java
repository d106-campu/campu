package com.d106.campu.user.service;

import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.security.JwtManager;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.exception.code.UserExceptionCode;
import com.d106.campu.user.repository.jpa.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    private final JwtManager jwtManager;

    /**
     * @param request
     * @return `null` if there is no token in the request header. `user` if the token is valid(login status).
     * @throws NotFoundException If there is a token in the header but it is not valid.
     */
    public User getUserFromToken(HttpServletRequest request) {
        if (request.getHeader("Authorization") != null) {
            return userRepository.findByAccount(jwtManager.getAccount(request.getHeader("Authorization").substring(7)))
                .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
        }
        return null;
    }

}
