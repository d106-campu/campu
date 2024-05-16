package com.d106.campu.notification.event;

import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EmptyRoomEvent {

    private List<Data> data;

    @Getter
    @Builder
    public static class Data {
        private Long emptyNotificationId;
        private final String message = "빈자리가 났어요!";
        private Long userId;
        private String campsiteId;
        private String campsiteName;
        private String roomName;
        private LocalDate startDate;
        private LocalDate endDate;
        private int baseNo;
        private int maxNo;
    }

}
