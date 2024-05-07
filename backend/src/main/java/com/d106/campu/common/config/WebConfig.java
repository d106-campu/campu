package com.d106.campu.common.config;

import com.d106.campu.image.constant.ImageConstant;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/image/campsite/**")
            .addResourceLocations(ImageConstant.TEST_DIR.toString());
    }

}
