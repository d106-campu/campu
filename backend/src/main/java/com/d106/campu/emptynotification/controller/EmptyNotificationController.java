package com.d106.campu.emptynotification.controller;

import com.d106.campu.common.response.Response;
import com.d106.campu.emptynotification.controller.doc.EmptyNotificationControllerDoc;
import com.d106.campu.emptynotification.dto.EmptyNotificationDto.CreateRequest;
import com.d106.campu.emptynotification.service.EmptyNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/empty-notification")
@RequiredArgsConstructor
@RestController
public class EmptyNotificationController implements EmptyNotificationControllerDoc {

    private final EmptyNotificationService emptyNotificationService;

    @Override
    @PostMapping
    public Response create(@RequestBody CreateRequest createRequestDto) {
        emptyNotificationService.create(createRequestDto);
        return new Response();
    }

    @Override
    @DeleteMapping("/{roomId}")
    public Response delete(@PathVariable Long roomId) {
        emptyNotificationService.delete(roomId);
        return new Response();
    }

}
