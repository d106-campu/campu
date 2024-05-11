package com.d106.campu.notification.controller;

import com.d106.campu.common.response.Response;
import com.d106.campu.notification.constant.NotificationConstant;
import com.d106.campu.notification.controller.doc.NotificationControllerDoc;
import com.d106.campu.notification.dto.NotificationDto.PublishEventRequest;
import com.d106.campu.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequestMapping("/notification")
@RequiredArgsConstructor
@RestController
public class NotificationController implements NotificationControllerDoc {

    private final NotificationService notificationService;

    @Override
    @GetMapping(value = "/v1", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connectSseV1() {
        return ResponseEntity.ok()
            .header("X-Accel-Buffering", "no")
            .header("Transfer-Encoding", "chunked")
            .body(notificationService.connectSseV1());
    }

    @Override
    @GetMapping(value = "/test/v2", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connectSseV2(@RequestParam("id") Long userId) {
        return ResponseEntity.ok()
            .header("X-Accel-Buffering", "no")
            .header("Transfer-Encoding", "chunked")
            .body(notificationService.connectSseV2(userId));
    }

    @Override
    @DeleteMapping("/{notificationId}")
    public Response deleteNotification(@PathVariable("notificationId") Long notificationId) {
        notificationService.deleteNotification(notificationId);
        return new Response();
    }

    @Override
    @PostMapping("/test/publish")
    public Response publishEvent(@RequestBody PublishEventRequest publishEventRequestDto) {
        notificationService.publishEvent(publishEventRequestDto);
        return new Response();
    }

    @Override
    @GetMapping("/list")
    public Response getNotificationList(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return new Response(NotificationConstant.NOTIFICATION_LIST, notificationService.getNotificationList(pageable));
    }

}
