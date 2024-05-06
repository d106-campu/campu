package com.d106.campu.reservation.controller;

import com.d106.campu.common.response.Response;
import com.d106.campu.reservation.constant.ReservationConstant;
import com.d106.campu.reservation.controller.doc.ReservationControllerDoc;
import com.d106.campu.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/reservation")
@RequiredArgsConstructor
@RestController
public class ReservationController implements ReservationControllerDoc {

    private final ReservationService reservationService;

    @Override
    @GetMapping
    public Response getReservationList(Pageable pageable) {
        return new Response(ReservationConstant.RESERVATION_LIST, reservationService.getReservationList(pageable));
    }

}
