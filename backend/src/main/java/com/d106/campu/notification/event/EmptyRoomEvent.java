package com.d106.campu.notification.event;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class EmptyRoomEvent {

    private final String message = "빈방이 났어요!";
    private Long userId;
    private String campsiteId;
    private String campsiteName;
    private String roomName;
    private LocalDate startDate;
    private LocalDate endDate;
    private int baseNo;
    private int maxNo;

}
