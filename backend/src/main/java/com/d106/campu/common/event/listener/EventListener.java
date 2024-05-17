package com.d106.campu.common.event.listener;

import com.d106.campu.common.util.SmsUtil;
import com.d106.campu.emptynotification.service.EmptyNotificationService;
import com.d106.campu.notification.dto.NotificationDto.SaveResponse;
import com.d106.campu.notification.event.CancelEvent;
import com.d106.campu.notification.event.EmptyRoomEvent;
import com.d106.campu.notification.event.PaymentEvent;
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
    private final EmptyNotificationService emptyNotificationService;
    private final SmsUtil smsUtil;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT, classes = {EmptyRoomEvent.class})
    public void saveAndSendEmptyRoomNotification(EmptyRoomEvent emptyRoomEvent) {
        // TODO: 지난 날짜에 대한 알림을 보내지 않도록 처리
        // TODO: 알림 보내고 나서 보낸 여부를 체크하든가 EmptyNotification을 삭제하든가 할 필요가 있음
        List<Long> emptyNotificationIdList = emptyRoomEvent.getData().stream()
            .map(EmptyRoomEvent.Data::getEmptyNotificationId)
            .toList();
        List<SaveResponse> saveResponseDtoList = notificationService.saveEmptyRoomNotification(emptyRoomEvent.getData());
        notificationService.sendSseNotification(saveResponseDtoList);
        smsUtil.sendSmsNotification(saveResponseDtoList);
        emptyNotificationService.deleteEmptyNotification(emptyNotificationIdList);
    }

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT, classes = {PaymentEvent.class})
    public void saveAndSendPaymentNotification(PaymentEvent paymentEvent) {
        List<SaveResponse> saveResponseDtoList = notificationService.savePaymentNotification(paymentEvent.getData());
        notificationService.sendSseNotification(saveResponseDtoList);
        smsUtil.sendSmsNotification(saveResponseDtoList);
    }

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT, classes = {CancelEvent.class})
    public void saveAndSendCancelNotification(CancelEvent cancelEvent) {
        List<SaveResponse> saveResponseDtoList = notificationService.saveCancelNotification(cancelEvent.getData());
        notificationService.sendSseNotification(saveResponseDtoList);
        smsUtil.sendSmsNotification(saveResponseDtoList);
    }

    /**
     * 커밋이 없는 테스트 환경에서 사용한다.
     */
//    @Async
//    @org.springframework.context.event.EventListener(classes = {EmptyRoomEvent.class})
//    public void testSaveAndSendNotification(EmptyRoomEvent emptyRoomEvent) {
//        List<SaveResponse> saveResponseDtoList = notificationService.saveEmptyRoomNotification(emptyRoomEvent.getData());
//        notificationService.sendSseNotification(saveResponseDtoList);
//        smsUtil.sendSmsNotification(saveResponseDtoList);
//    }

}
