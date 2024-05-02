package com.d106.campu.common.logging;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@ToString
public class LoggingForm {

    @Setter
    private String apiUrl;

    @Setter
    private String apiMethod;

    private Long queryCount = 0L;
    private Long queryTime = 0L;

    public void increaseQueryCount() {
        queryCount++;
    }

    public void increaseQueryTime(final Long deltaTime) {
        queryTime += deltaTime;
    }

}
