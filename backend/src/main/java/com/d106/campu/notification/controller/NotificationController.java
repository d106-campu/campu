package com.d106.campu.notification.controller;

import com.d106.campu.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequestMapping("/notification")
@RequiredArgsConstructor
@RestController
public class NotificationController {

    private final NotificationService NotificationService;

    @GetMapping(value = "/v1", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connectSseV1() {
        return ResponseEntity.ok()
            .header("X-Accel-Buffering", "no")
            .body(NotificationService.connectSseV1());
    }

    @GetMapping(value = "/v2", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connectSseV2(@RequestParam("email") String email) {
        return ResponseEntity.ok()
            .header("X-Accel-Buffering", "no")
            .body(NotificationService.connectSseV2(email));
    }

}
