package com.d106.campu.common.event.listener;

import com.d106.campu.common.util.SmsUtil;
import com.d106.campu.notification.dto.NotificationDto.SaveResponse;
import com.d106.campu.notification.event.EmptyRoomEvent;
import com.d106.campu.notification.service.NotificationService;
import java.util.List;
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
        // TODO: 지난 날짜에 대한 알림을 보내지 않도록 처리
        // TODO: 알림 보내고 나서 보낸 여부를 체크하든가 EmptyNotification을 삭제하든가 할 필요가 있음
        List<SaveResponse> saveResponseDtoList = notificationService.saveNotification(emptyRoomEvent.getData());
        notificationService.sendNotification(saveResponseDtoList);
        smsUtil.sendEmptyRoomNotification(saveResponseDtoList);
    }

    /**
     * 커밋이 없는 테스트 환경에서 사용한다.
     */
    @Async
    @org.springframework.context.event.EventListener(classes = {EmptyRoomEvent.class})
    public void testSaveAndSendNotification(EmptyRoomEvent emptyRoomEvent) {
        List<SaveResponse> saveResponseDtoList = notificationService.saveNotification(emptyRoomEvent.getData());
        notificationService.sendNotification(saveResponseDtoList);
        smsUtil.sendEmptyRoomNotification(saveResponseDtoList);
    }

}
