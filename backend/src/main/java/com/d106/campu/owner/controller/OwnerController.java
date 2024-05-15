package com.d106.campu.owner.controller;

import com.d106.campu.campsite.constant.CampsiteConstant;
import com.d106.campu.common.response.Response;
import com.d106.campu.owner.controller.doc.OwnerControllerDoc;
import com.d106.campu.owner.dto.OwnerDto;
import com.d106.campu.owner.service.OwnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/owner")
@RequiredArgsConstructor
@RestController
public class OwnerController implements OwnerControllerDoc {

    private final OwnerService ownerService;

    @Override
    @PostMapping("/bizrno")
    public Response registerCampsite(@RequestParam String bizrno) {
        ownerService.registerCampsite(bizrno);
        return new Response();
    }

    @Override
    @GetMapping("/campsite")
    public Response getOwnerCampsiteList(Pageable pageable) {
        return new Response(CampsiteConstant.CAMPSITE_LIST, ownerService.getOwnerCampsiteList(pageable));
    }

    @Override
    @PostMapping("/campsite/detail")
    public Response updateCampsiteDetail(@RequestBody OwnerDto.CampsiteUpdateRequest updateRequestDto) {
        ownerService.updateCampsiteDetail(updateRequestDto);
        return new Response();
    }

}
