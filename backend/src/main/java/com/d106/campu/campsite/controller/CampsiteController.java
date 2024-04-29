package com.d106.campu.campsite.controller;

import com.d106.campu.campsite.controller.doc.CampsiteControllerDoc;
import com.d106.campu.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/campsite")
@RequiredArgsConstructor
@RestController
public class CampsiteController implements CampsiteControllerDoc {

    @Override
    @GetMapping
    public Response getCampsiteList() {
        return new Response();
    }

}
