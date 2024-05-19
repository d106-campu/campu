package com.d106.campu.common.config;

import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
@EnableScheduling
public class AsyncConfig implements AsyncConfigurer {

    @Override
    @Bean(name = "asyncExecutor")
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(100);
        executor.setKeepAliveSeconds(180);
        executor.setThreadNamePrefix("async-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();

        /**
         * SecurityContext는 기본적으로 ThreadLocal하게 관리된다.
         * 따라서 별도의 설정을 해주지 않으면 비동기 처리 시 자식 스레드에서는 부모 스레드의 SecurityContext를 참조할 수 없다.
         * 이를 해결하기 위해서는 new DelegatingSecurityContextAsyncTaskExecutor(executor)를 사용하여 부모 스레드의 SecurityContext를 자식 스레드로 전파해야 한다.
         * 지금 당장에는 쓸 일이 없어서 일반 executor를 반환한다.
         */
        return executor;
    }

}