package com.d106.campu.common.event.listener;

import com.d106.campu.common.util.SmsUtil;
import com.d106.campu.notification.dto.NotificationDto;
import com.d106.campu.notification.event.EmptyRoomEvent;
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
    private final SmsUtil smsUtil;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT, classes = {EmptyRoomEvent.class})
    public void saveAndSendNotification(EmptyRoomEvent emptyRoomEvent) {
        NotificationDto.SaveResponse saveResponseDto = notificationService.saveNotification(emptyRoomEvent);
        notificationService.sendNotification(saveResponseDto);
    }

    /**
     * 커밋이 없는 테스트 환경에서 사용한다.
     */
    @Async
    @org.springframework.context.event.EventListener(classes = {EmptyRoomEvent.class})
    public void testSaveAndSendNotification(EmptyRoomEvent emptyRoomEvent) {
        NotificationDto.SaveResponse saveResponseDto = notificationService.saveNotification(emptyRoomEvent);
        notificationService.sendNotification(saveResponseDto);
        smsUtil.sendEmptyRoomNotification(saveResponseDto);
    }

}
