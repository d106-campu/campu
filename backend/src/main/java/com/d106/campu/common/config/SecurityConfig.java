package com.d106.campu.common.config;

import com.d106.campu.common.security.JwtAccessDeniedHandler;
import com.d106.campu.common.security.JwtAuthenticationEntryPoint;
import com.d106.campu.common.security.JwtAuthenticationFilter;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Value("${management.server.port}")
    private int managementPort;

    public static final String[] PERMIT_URL_LIST = {
        /* auth */
        "/auth/**",
        /* swagger v3 */
        "/v3/api-docs/**",
        "/swagger-ui/**",
        /* health */
        "/health/**",
        /* notification */
        "/notification/test/**",
        /* campsite */
        "/campsite",
        "/campsite/*",
        "/campsite/*/room",
        /* reservation */
        "/reservation/**",
        /* file */
        "/file/**",
        /* review */
        "/review/campsite/**",
    };

    @Value("${cors.origin.list}")
    List<String> originList;

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
            http.getSharedObject(AuthenticationManagerBuilder.class);
        return authenticationManagerBuilder.build();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        /* unneeded features disable */
        http.csrf(AbstractHttpConfigurer::disable)
            .httpBasic(AbstractHttpConfigurer::disable)
            .sessionManagement(sessionManagement ->
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        /* authorization */
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers(PERMIT_URL_LIST).permitAll()
                .requestMatchers(checkPort()).permitAll()
                .anyRequest().authenticated())
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        /* exception handle */
        http.exceptionHandling(httpSecurityExceptionHandlingConfigurer -> {
            httpSecurityExceptionHandlingConfigurer.accessDeniedHandler(jwtAccessDeniedHandler)
                .authenticationEntryPoint(jwtAuthenticationEntryPoint);
        });

        /* cors */
        http.cors(cors -> cors.configurationSource(request -> {
            CorsConfiguration corsConfig = new CorsConfiguration();
            corsConfig.setAllowedOrigins(originList);
            corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
            corsConfig.setAllowedHeaders(List.of("*"));
            corsConfig.addExposedHeader("Authorization");
            corsConfig.setAllowCredentials(true);

            return corsConfig;
        }));

        return http.build();
    }

    private RequestMatcher checkPort() {
        return (HttpServletRequest request) -> managementPort == request.getLocalPort();
    }

}
