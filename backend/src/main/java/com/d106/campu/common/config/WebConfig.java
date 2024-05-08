package com.d106.campu.common.config;

import com.d106.campu.image.constant.ImageConstant;
import java.nio.file.Path;
import java.util.concurrent.TimeUnit;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        /**
         * 공개 캐시를 사용하고자 할 경우 cachePublic()을 사용한다.
         */
        registry.addResourceHandler("/file/user/**", "/file/campsite/**")
            .addResourceLocations(getResourceLocation(ImageConstant.USER_DIR), getResourceLocation(ImageConstant.CAMPSITE_DIR))
            .setCacheControl(CacheControl.maxAge(3, TimeUnit.MINUTES));
    }

    private String getResourceLocation(Path dir) {
        return String.format("file:%s/", dir.toString());
    }

}
