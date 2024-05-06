package com.d106.campu.reservation.service;

import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.reservation.mapper.ReservationMapper;
import com.d106.campu.reservation.repository.jpa.ReservationRepository;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.exception.code.UserExceptionCode;
import com.d106.campu.user.repository.jpa.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReservationService {

    private final UserRepository userRepository;

    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;

    @Transactional(readOnly = true)
    public Page getReservationList(Pageable pageable) {
        /* TODO: Replace this with login user (using securityHelper) */
        User user = userRepository.findById(1L)
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
        return reservationRepository.findByUser(pageable, user).map(reservationMapper::toReservationResponseDto);
    }

}
