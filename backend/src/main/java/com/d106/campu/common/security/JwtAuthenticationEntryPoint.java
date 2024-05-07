package com.d106.campu.common.security;

import com.d106.campu.common.exception.code.CommonExceptionCode;
import com.d106.campu.common.response.ResponseFail;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
        HttpServletResponse response,
        AuthenticationException exception) throws IOException {

        // TODO : 상세환 예외처리 추가
        ResponseFail responseFail;
        if (exception instanceof BadCredentialsException) {
            responseFail = new ResponseFail(CommonExceptionCode.UNAUTHORIZED.getCode(),
                CommonExceptionCode.UNAUTHORIZED.getMessage());
        } else {
            responseFail = new ResponseFail(CommonExceptionCode.UNAUTHORIZED.getCode(),
                CommonExceptionCode.UNAUTHORIZED.getMessage());
        }

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());

        PrintWriter out = response.getWriter();
        out.print(responseFail);
        out.flush();
        out.close();
    }

}
