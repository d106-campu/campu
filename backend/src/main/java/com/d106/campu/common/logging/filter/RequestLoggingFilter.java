package com.d106.campu.common.logging.filter;

import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.AbstractRequestLoggingFilter;

@Slf4j
public class RequestLoggingFilter extends AbstractRequestLoggingFilter {

    /**
     * prometheus 주소를 별도로 설정하지 않았다면 beforeRequest()에서 prometheus 로그를 제외해야 한다.
     */
    @Override
    protected void beforeRequest(@NonNull final HttpServletRequest request, @NonNull final String message) {

    }

    @Override
    protected void afterRequest(@NonNull final HttpServletRequest request, @NonNull final String message) {

    }

}
