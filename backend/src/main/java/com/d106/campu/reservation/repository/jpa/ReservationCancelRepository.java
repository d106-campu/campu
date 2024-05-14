package com.d106.campu.reservation.repository.jpa;

import com.d106.campu.reservation.domain.jpa.ReservationCancel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationCancelRepository extends JpaRepository<ReservationCancel, Long> {
    
}
