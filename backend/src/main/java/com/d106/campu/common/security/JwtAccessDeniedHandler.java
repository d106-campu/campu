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
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request,
        HttpServletResponse response,
        AccessDeniedException accessDeniedException) throws IOException {
        // AccessDeniedException : no access authority by role.

        ResponseFail fail = new ResponseFail(CommonExceptionCode.INACCESSIBLE_DATA.getCode(),
            CommonExceptionCode.INACCESSIBLE_DATA.getMessage());
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());

        PrintWriter out = response.getWriter();
        out.print(fail);
        out.flush();
        out.close();
    }

}
