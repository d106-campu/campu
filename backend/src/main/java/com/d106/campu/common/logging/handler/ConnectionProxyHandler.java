package com.d106.campu.common.logging.handler;

import com.d106.campu.common.constant.LoggingConstant;
import com.d106.campu.common.logging.LoggingForm;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import java.lang.reflect.Method;
import lombok.RequiredArgsConstructor;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.aop.framework.ProxyFactory;

@RequiredArgsConstructor
public class ConnectionProxyHandler implements MethodInterceptor {

    private final Object connection;

    private final LoggingForm loggingForm;

    @Nullable
    @Override
    public Object invoke(@Nonnull final MethodInvocation invocation) throws Throwable {
        final Object result = invocation.proceed();
        if (hasConnection(result) && hasPreparedStatementInvoked(invocation)) {
            final ProxyFactory proxyFactory = new ProxyFactory(result);
            proxyFactory.addAdvice(new PreparedStatementProxyHandler(loggingForm));
            return proxyFactory.getProxy();
        }
        return result;
    }

    private boolean hasPreparedStatementInvoked(final MethodInvocation invocation) {
        final Object targetObject = invocation.getThis();
        if (targetObject == null) {
            return false;
        }
        final Class<?> targetClass = targetObject.getClass();
        final Method targetMethod = invocation.getMethod();
        return StringUtils.contains(targetClass.getName(), LoggingConstant.HIKARI_CONNECTION_NAME) &&
                StringUtils.equals(targetMethod.getName(), LoggingConstant.JDBC_PREPARE_STATEMENT_METHOD_NAME);
    }

    private boolean hasConnection(final Object result) {
        return ObjectUtils.isNotEmpty(result);
    }

    public Object getProxy() {
        final ProxyFactory proxyFactory = new ProxyFactory(connection);
        proxyFactory.addAdvice(this);
        return proxyFactory.getProxy();
    }

}
