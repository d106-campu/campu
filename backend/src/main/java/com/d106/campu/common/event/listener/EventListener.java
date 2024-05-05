package com.d106.campu.common.event.listener;

import com.d106.campu.notification.event.TestEvent;
import com.d106.campu.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@RequiredArgsConstructor
@Component
public class EventListener {

    private final NotificationService notificationService;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT, classes = {TestEvent.class})
    public void saveAndSendNotification(Object event) {
        TestEvent testEvent = (TestEvent) event;
        notificationService.saveNotification(testEvent.getUserId(), testEvent.getContent());
        notificationService.sendNotification(testEvent.getUserId(), testEvent.getContent());
    }

    /**
     * 커밋이 없는 테스트 환경에서 사용한다.
     */
    @Async
    @org.springframework.context.event.EventListener(classes = {TestEvent.class})
    public void testSaveAndSendNotification(Object event) {
        TestEvent testEvent = (TestEvent) event;
        notificationService.saveNotification(testEvent.getUserId(), testEvent.getContent());
        notificationService.sendNotification(testEvent.getUserId(), testEvent.getContent());
    }

}
