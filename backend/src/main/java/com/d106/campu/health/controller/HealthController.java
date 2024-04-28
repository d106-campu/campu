package com.d106.campu.health.controller;

import com.d106.campu.common.response.Response;
import com.d106.campu.health.constant.HealthConstant;
import com.d106.campu.health.controller.doc.HealthControllerDoc;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/health")
@Slf4j
@RestController
public class HealthController implements HealthControllerDoc {

    @GetMapping
    public Response checkHealth() {
        return new Response();
    }

    @Transactional
    @GetMapping("/log/info")
    public Response checkLogInfo() {
        log.info("Info test: {}", HealthConstant.SUCCESS);
        return new Response();
    }

    @GetMapping("/log/warn")
    public Response checkLogWarn() {
        log.warn("Warn test: {}", HealthConstant.SUCCESS);
        return new Response();
    }

    @GetMapping("/log/error")
    public Response checkLogError() {
        log.error("Error test: {}", HealthConstant.SUCCESS);
        return new Response();
    }

}