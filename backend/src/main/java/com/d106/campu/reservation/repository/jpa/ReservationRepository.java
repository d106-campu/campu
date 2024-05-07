package com.d106.campu.reservation.repository.jpa;

import com.d106.campu.reservation.domain.jpa.Reservation;
import com.d106.campu.user.domain.jpa.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Page<Reservation> findByUser(Pageable pageable, User user);

}
