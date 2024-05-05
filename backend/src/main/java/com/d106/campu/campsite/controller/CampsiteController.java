package com.d106.campu.campsite.controller;

import com.d106.campu.campsite.constant.CampsiteConstant;
import com.d106.campu.campsite.controller.doc.CampsiteControllerDoc;
import com.d106.campu.campsite.dto.CampsiteDto;
import com.d106.campu.campsite.service.CampsiteService;
import com.d106.campu.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/campsite")
@RequiredArgsConstructor
@RestController
public class CampsiteController implements CampsiteControllerDoc {

    private final CampsiteService campsiteService;

    @Override
    @GetMapping
    public Response getCampsiteList(
        Pageable pageable,
        @RequestParam(required = false) String induty,
        @RequestParam(required = false) String theme,
        @RequestParam(required = false) boolean owner
    ) {
        return new Response(CampsiteConstant.CAMPSITE_LIST, campsiteService.getCampsiteList(pageable, induty, theme, owner));
    }

    @Override
    @PostMapping("/register")
    public Response createCampsite(@RequestBody CampsiteDto.CreateRequest createRequestDto) {
        return new Response(CampsiteConstant.CAMPSITE, campsiteService.createCampsite(createRequestDto));
    }

    @Override
    @PostMapping("/like/{campsiteId}")
    public Response likeCampsite(@PathVariable Long campsiteId) {
        return new Response(CampsiteConstant.CAMPSITE_LIKE, campsiteService.likeCampsite(campsiteId));
    }

}
