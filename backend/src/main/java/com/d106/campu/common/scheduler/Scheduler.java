package com.d106.campu.common.scheduler;

import com.d106.campu.emptynotification.domain.jpa.EmptyNotification;
import com.d106.campu.notification.mapper.NotificationMapper;
import com.d106.campu.reservation.service.ReservationService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

@RequiredArgsConstructor
@Component
@Slf4j
public class Scheduler {

    private final ReservationService reservationService;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final NotificationMapper notificationMapper;

    @Async
    @Scheduled(cron = "0 * * * * *")
    @Transactional(readOnly = true)
    public void sendNotificationForEmptyRoom() {
        log.info("Scheduler: sendNotificationForEmptyRoom()");
        List<EmptyNotification> emptyNotificationList = reservationService.getEmptyNotificationList();
        if (!CollectionUtils.isEmpty(emptyNotificationList)) {
            applicationEventPublisher.publishEvent(notificationMapper.toEmptyRoomEvent(emptyNotificationList));
        }
    }

}
