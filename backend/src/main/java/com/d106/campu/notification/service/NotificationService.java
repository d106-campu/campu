package com.d106.campu.notification.service;

import com.d106.campu.common.exception.InvalidException;
import com.d106.campu.common.response.Response;
import com.d106.campu.notification.constant.NotificationConstant;
import com.d106.campu.notification.domain.jpa.Notification;
import com.d106.campu.notification.dto.NotificationDto;
import com.d106.campu.notification.dto.NotificationDto.PublishEventRequest;
import com.d106.campu.notification.event.TestEvent;
import com.d106.campu.notification.exception.code.NotificationExceptionCode;
import com.d106.campu.notification.mapper.NotificationMapper;
import com.d106.campu.notification.repository.jpa.NotificationRepository;
import com.d106.campu.user.exception.code.UserExceptionCode;
import com.d106.campu.user.repository.jpa.UserRepository;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
@Service
public class NotificationService {

    private static final Map<Long, SseEmitter> sseEmitterMap = new ConcurrentHashMap<>();
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final UserRepository userRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    public SseEmitter connectSseV1() {
        SseEmitter sseEmitter = new SseEmitter(NotificationConstant.SSE_TIMEOUT_MILLIS);
//        sseEmitterMap.put(securityHelper.getLoginUsername(), sseEmitter);
//        sseEmitter.onCompletion(() -> sseEmitterMap.remove(securityHelper.getLoginUsername()));
//        sseEmitter.onTimeout(() -> sseEmitterMap.remove(securityHelper.getLoginUsername()));
//        sseEmitter.onError((e) -> sseEmitterMap.remove(securityHelper.getLoginUsername()));
        try {
//            sendNotification(userId, NotificationConstant.SSE_SUCCESS);
        } catch (Exception e) {
            throw new InvalidException(NotificationExceptionCode.INVALID_CONNECTION);
        }
        return sseEmitter;
    }

    public SseEmitter connectSseV2(Long userId) {
        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        sseEmitterMap.put(userId, sseEmitter);
        sseEmitter.onCompletion(() -> sseEmitterMap.remove(userId));
        sseEmitter.onTimeout(() -> sseEmitterMap.remove(userId));
        sseEmitter.onError((e) -> sseEmitterMap.remove(userId));
        try {
            NotificationDto.SendRequest sendRequestDto = NotificationDto.SendRequest.builder()
                .userId(userId)
                .content(NotificationConstant.SSE_SUCCESS)
                .build();
            sendNotification(sendRequestDto);
        } catch (Exception e) {
            throw new InvalidException(NotificationExceptionCode.INVALID_CONNECTION);
        }
        return sseEmitter;
    }

    public void sendNotification(NotificationDto.SendRequest sendRequestDto) {
        Optional.ofNullable(sseEmitterMap.get(sendRequestDto.getUserId())).ifPresent(emitter -> {
            try {
                emitter.send(SseEmitter.event().name(NotificationConstant.SSE_EVENT)
                    .data(new Response(NotificationConstant.NOTIFICATION, notificationMapper.toSendResponse(sendRequestDto))));
            } catch (Exception e) {
                throw new InvalidException(NotificationExceptionCode.FAIL_SEND);
            }
        });
    }

    @Transactional
    public Long saveNotification(NotificationDto.SaveRequest saveRequestDto) {
        Notification notification = notificationMapper.toNotification(saveRequestDto);
        notification.setUser(
            userRepository.findById(saveRequestDto.getUserId())
                .orElseThrow(() -> new InvalidException(UserExceptionCode.USER_NOT_FOUND)));
        return notificationRepository.save(notification).getId();
    }

    @Transactional
    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }

    public void publishEvent(PublishEventRequest publishEventRequestDto) {
        TestEvent testEvent = notificationMapper.toTestEvent(publishEventRequestDto);
        applicationEventPublisher.publishEvent(testEvent);
    }

}
