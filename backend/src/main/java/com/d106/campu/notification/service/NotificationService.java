package com.d106.campu.notification.service;

import com.d106.campu.common.exception.InvalidException;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.response.Response;
import com.d106.campu.common.util.SecurityHelper;
import com.d106.campu.notification.constant.NotificationConstant;
import com.d106.campu.notification.domain.jpa.Notification;
import com.d106.campu.notification.dto.NotificationDto;
import com.d106.campu.notification.dto.NotificationDto.PublishEventRequest;
import com.d106.campu.notification.event.TestEvent;
import com.d106.campu.notification.exception.code.NotificationExceptionCode;
import com.d106.campu.notification.mapper.NotificationMapper;
import com.d106.campu.notification.repository.jpa.NotificationRepository;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.exception.code.UserExceptionCode;
import com.d106.campu.user.repository.jpa.UserRepository;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    private final SecurityHelper securityHelper;

    public SseEmitter connectSseV1() {
        User user = userRepository.findByAccount(securityHelper.getLoginAccount())
            .orElseThrow(() -> new InvalidException(UserExceptionCode.USER_NOT_FOUND));

        SseEmitter sseEmitter = new SseEmitter(NotificationConstant.SSE_TIMEOUT_MILLIS);
        sseEmitterMap.put(user.getId(), sseEmitter);
        sseEmitter.onCompletion(() -> sseEmitterMap.remove(user.getId()));
        sseEmitter.onTimeout(() -> sseEmitterMap.remove(user.getId()));
        sseEmitter.onError((e) -> sseEmitterMap.remove(user.getId()));
        try {
            sseEmitter.send(SseEmitter.event().name(NotificationConstant.SSE_EVENT)
                .data(new Response(NotificationConstant.NOTIFICATION, NotificationConstant.SSE_SUCCESS)));
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
            sseEmitter.send(SseEmitter.event().name(NotificationConstant.SSE_EVENT)
                .data(new Response(NotificationConstant.NOTIFICATION, NotificationConstant.SSE_SUCCESS)));
        } catch (Exception e) {
            throw new InvalidException(NotificationExceptionCode.INVALID_CONNECTION);
        }
        return sseEmitter;
    }

    @Transactional(readOnly = true)
    public void sendNotification(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
            .orElseThrow(() -> new NotFoundException(NotificationExceptionCode.NOT_FOUND_NOTIFICATION));

        Optional.ofNullable(sseEmitterMap.get(notification.getUser().getId())).ifPresent(emitter -> {
            try {
                emitter.send(SseEmitter.event().name(NotificationConstant.SSE_EVENT)
                    .data(
                        new Response(NotificationConstant.NOTIFICATION, notificationMapper.toSendResponseDto(notification))));
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
        notificationRepository.save(notification);
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

    @Transactional(readOnly = true)
    public Page<NotificationDto.ListResponse> getNotificationList(Pageable pageable) {
        return notificationRepository.findAllByUser_Id(pageable, 1L).map(notificationMapper::toListResponseDto);
    }

}
