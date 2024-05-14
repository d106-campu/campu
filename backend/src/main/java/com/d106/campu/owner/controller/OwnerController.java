package com.d106.campu.owner.controller;

import com.d106.campu.campsite.constant.CampsiteConstant;
import com.d106.campu.common.response.Response;
import com.d106.campu.owner.controller.doc.OwnerControllerDoc;
import com.d106.campu.owner.service.OwnerService;
import com.d106.campu.reservation.constant.ReservationConstant;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/owner")
@RequiredArgsConstructor
@RestController
public class OwnerController implements OwnerControllerDoc {

    private final OwnerService ownerService;

    @Override
    @GetMapping("/campsite")
    public Response getOwnerCampsiteList(Pageable pageable) {
        return new Response(CampsiteConstant.CAMPSITE_LIST, ownerService.getOwnerCampsiteList(pageable));
    }

    @Override
    @GetMapping("/reservation/campsite/{campsiteId}")
    public Response getOwnerReservationListByCampsite(@PathVariable Long campsiteId, Pageable pageable) {
        return new Response(ReservationConstant.RESERVATION_LIST,
            ownerService.getOwnerReservationListByCampsite(campsiteId, pageable));
    }

}
