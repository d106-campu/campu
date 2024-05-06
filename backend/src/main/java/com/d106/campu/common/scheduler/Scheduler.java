package com.d106.campu.common.scheduler;

import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class Scheduler {

    @Async
    @Scheduled
    public void sendNotificationForEmptyRoom() {
    }

}
