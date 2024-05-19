package com.d106.campu.notification.event;

import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PaymentEvent {

    private List<Data> data;

    @Getter
    @Builder
    public static class Data {
        private final String message = "예약이 완료되었습니다.";
        private Long userId;
        private String campsiteName;
        private String roomName;
        private LocalDate startDate;
        private LocalDate endDate;
        private int headCnt;
        private Long price;
    }

}
