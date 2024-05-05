package com.d106.campu.notification.event;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TestEvent {

    private Long userId;
    private String content;

}
