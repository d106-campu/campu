package com.d106.campu.reservation.controller;

import com.d106.campu.common.response.Response;
import com.d106.campu.reservation.controller.doc.ReservationControllerDoc;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/reservation")
@RequiredArgsConstructor
@RestController
public class ReservationController implements ReservationControllerDoc {

    @GetMapping
    public Response getReservationList() {
        return new Response();
    }

}
