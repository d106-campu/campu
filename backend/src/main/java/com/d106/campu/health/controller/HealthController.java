package com.d106.campu.health.controller;

import com.d106.campu.common.response.Response;
import com.d106.campu.health.constant.HealthConstant;
import com.d106.campu.health.controller.doc.HealthControllerDoc;
import com.d106.campu.health.service.HealthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/health")
@RequiredArgsConstructor
@Slf4j
@RestController
public class HealthController implements HealthControllerDoc {

    private final HealthService healthService;

    @Override
    @GetMapping
    public Response checkHealth() {
        return new Response();
    }

    @Override
    @GetMapping("/log/info")
    public Response checkLogInfo() {
        log.info("Info test: {}", HealthConstant.SUCCESS);
        return new Response();
    }

    @Override
    @GetMapping("/log/warn")
    public Response checkLogWarn() {
        log.warn("Warn test: {}", HealthConstant.SUCCESS);
        return new Response();
    }

    @Override
    @GetMapping("/log/error")
    public Response checkLogError() {
        log.error("Error test: {}", HealthConstant.SUCCESS);
        return new Response();
    }

    @Override
    @GetMapping("/campsite/original/{campsiteId}")
    public Response checkCampsiteOriginal(@PathVariable Long campsiteId) {
        return new Response(HealthConstant.CAMPSITE_ORIGINAL, healthService.getCampsiteOriginal(campsiteId));
    }

}