package com.d106.campu.notification.service;

import com.d106.campu.common.exception.InvalidException;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.exception.code.CommonExceptionCode;
import com.d106.campu.common.response.Response;
import com.d106.campu.common.util.SecurityHelper;
import com.d106.campu.notification.constant.NotificationConstant;
import com.d106.campu.notification.domain.jpa.Notification;
import com.d106.campu.notification.dto.NotificationDto;
import com.d106.campu.notification.dto.NotificationDto.PublishEventRequest;
import com.d106.campu.notification.event.CancelEvent;
import com.d106.campu.notification.event.EmptyRoomEvent;
import com.d106.campu.notification.event.PaymentEvent;
import com.d106.campu.notification.exception.code.NotificationExceptionCode;
import com.d106.campu.notification.mapper.NotificationMapper;
import com.d106.campu.notification.repository.jpa.NotificationRepository;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.exception.code.UserExceptionCode;
import com.d106.campu.user.repository.jpa.UserRepository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
@Service
@Slf4j
public class NotificationService {

    @Value("${app.base-url}")
    private String baseUrl;

    private static final Map<Long, SseEmitter> sseEmitterMap = new ConcurrentHashMap<>();
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final UserRepository userRepository;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final SecurityHelper securityHelper;

    public SseEmitter connectSseV1() {
        User user = userRepository.findByAccount(securityHelper.getLoginAccount())
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));

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
    public void sendSseNotification(List<NotificationDto.SaveResponse> saveResponseDtoList) {
        if (saveResponseDtoList.isEmpty()) {
            return;
        }
        log.info("Send SSE notification for empty room");
        saveResponseDtoList.forEach(saveResponseDto -> {
            Optional.ofNullable(sseEmitterMap.get(saveResponseDto.getUserId())).ifPresent(emitter -> {
                try {
                    emitter.send(SseEmitter.event().name(NotificationConstant.SSE_EVENT)
                        .data(
                            new Response(NotificationConstant.NOTIFICATION,
                                notificationMapper.toSendResponseDto(saveResponseDto))));
                } catch (Exception e) {
                    throw new InvalidException(NotificationExceptionCode.FAIL_SEND);
                }
            });
        });
    }

    @Transactional
    public List<NotificationDto.SaveResponse> saveEmptyRoomNotification(List<EmptyRoomEvent.Data> emptyRoomEventDataList) {
        List<Notification> notificationList = notificationMapper.fromEmptyRoomEventDataListToNotificationList(baseUrl,
            emptyRoomEventDataList);
        AtomicInteger count = new AtomicInteger(0);
        notificationList.forEach(notification -> {
            User user = userRepository.findById(emptyRoomEventDataList.get(count.getAndIncrement()).getUserId())
                .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
            notification.setUser(user);
        });

        return notificationMapper.toSaveResponseDtoList(notificationRepository.saveAll(notificationList));
    }

    @Transactional
    public List<NotificationDto.SaveResponse> savePaymentNotification(List<PaymentEvent.Data> paymentEventDataList) {
        List<Notification> notificationList = notificationMapper.fromPaymentEventDataListToNotificationList(baseUrl,
            paymentEventDataList);
        AtomicInteger count = new AtomicInteger(0);
        notificationList.forEach(notification -> {
            User user = userRepository.findById(paymentEventDataList.get(count.getAndIncrement()).getUserId())
                .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
            notification.setUser(user);
        });

        return notificationMapper.toSaveResponseDtoList(notificationRepository.saveAll(notificationList));
    }

    @Transactional
    public List<NotificationDto.SaveResponse> saveCancelNotification(List<CancelEvent.Data> cancelEventDataList) {
        List<Notification> notificationList = notificationMapper.fromCancelEventDataListToNotificationList(baseUrl,
            cancelEventDataList);
        AtomicInteger count = new AtomicInteger(0);
        notificationList.forEach(notification -> {
            User user = userRepository.findById(cancelEventDataList.get(count.getAndIncrement()).getUserId())
                .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
            notification.setUser(user);
        });

        return notificationMapper.toSaveResponseDtoList(notificationRepository.saveAll(notificationList));
    }

    @Transactional
    public void deleteNotification(Long notificationId) {
        User user = userRepository.findByAccount(securityHelper.getLoginAccount())
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
        if (!notificationRepository.existsByIdAndUser_Id(notificationId, user.getId())) {
            throw new InvalidException(CommonExceptionCode.UNAUTHORIZED);
        }

        notificationRepository.deleteById(notificationId);
    }

    public void publishEvent(PublishEventRequest publishEventRequestDto) {
        EmptyRoomEvent emptyRoomEvent = notificationMapper.toEmptyRoomEventForTest(publishEventRequestDto);
        applicationEventPublisher.publishEvent(emptyRoomEvent);
    }

    // TODO: 본인 알림만 조회 가능하도록 수정
    @Transactional(readOnly = true)
    public Page<NotificationDto.ListResponse> getNotificationList(Pageable pageable) {
        User user = userRepository.findByAccount(securityHelper.getLoginAccount())
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
        return notificationRepository.findAllByUser_Id(pageable, user.getId()).map(notificationMapper::toListResponseDto);
    }

}
