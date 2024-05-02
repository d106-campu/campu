package com.d106.campu.common.logging.handler;

import com.d106.campu.common.constant.LoggingConstant;
import com.d106.campu.common.logging.LoggingForm;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import java.lang.reflect.Method;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.time.StopWatch;

@RequiredArgsConstructor
public class PreparedStatementProxyHandler implements MethodInterceptor {

    private final LoggingForm loggingForm;

    @Nullable
    @Override
    public Object invoke(@Nonnull final MethodInvocation invocation) throws Throwable {
        final Method method = invocation.getMethod();
        if (CollectionUtils.containsAny(LoggingConstant.JDBC_QUERY_METHOD_LIST, method.getName())) {
            final StopWatch stopWatch = StopWatch.createStarted();
            final Object result = invocation.proceed();
            stopWatch.stop();
            loggingForm.increaseQueryTime(stopWatch.getTime());
            loggingForm.increaseQueryCount();
            return result;
        }
        return invocation.proceed();
    }

}
