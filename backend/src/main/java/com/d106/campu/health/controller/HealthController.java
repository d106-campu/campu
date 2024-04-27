package com.d106.campu.health.controller;

import com.d106.campu.common.response.Response;
import com.d106.campu.health.controller.doc.HealthControllerDoc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/health")
@RestController
public class HealthController implements HealthControllerDoc {

    @GetMapping
    public Response checkHealth() {
        return new Response();
    }

}