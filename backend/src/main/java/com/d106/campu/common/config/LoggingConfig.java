package com.d106.campu.common.config;

import com.d106.campu.common.constant.LoggingConstant;
import com.d106.campu.common.logging.filter.RequestLoggingFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoggingConfig {

    @Bean
    public RequestLoggingFilter loggingFilter() {
        RequestLoggingFilter filter = new RequestLoggingFilter();
        filter.setIncludeClientInfo(false);
        filter.setIncludeHeaders(false);
        filter.setIncludePayload(true);
        filter.setIncludeQueryString(true);
        filter.setMaxPayloadLength(LoggingConstant.MAX_PAYLOAD_LENGTH);

        return filter;
    }

}
