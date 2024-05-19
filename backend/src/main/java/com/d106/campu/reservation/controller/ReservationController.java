package com.d106.campu.reservation.controller;

import com.d106.campu.reservation.controller.doc.ReservationControllerDoc;
import com.d106.campu.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/reservation")
@RequiredArgsConstructor
@RestController
public class ReservationController implements ReservationControllerDoc {

    private final ReservationService reservationService;

}
