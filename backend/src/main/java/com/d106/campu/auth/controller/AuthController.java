package com.d106.campu.auth.controller;

import com.d106.campu.auth.constant.AuthConstant;
import com.d106.campu.auth.controller.doc.AuthControllerDoc;
import com.d106.campu.auth.dto.AuthDto.JoinRequest;
import com.d106.campu.auth.dto.AuthDto.LoginRequest;
import com.d106.campu.auth.dto.AuthDto.TelVerifyRequest;
import com.d106.campu.auth.service.AuthService;
import com.d106.campu.common.response.Response;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RequiredArgsConstructor
@RestController
public class AuthController implements AuthControllerDoc {

    private final AuthService authService;

    @Override
    @GetMapping("/account")
    public Response checkAvailableAccount(@RequestParam String account) {
        return new Response(AuthConstant.AVAILABLE, authService.checkAvailableAccount(account));
    }

    @Override
    @GetMapping("/nickname")
    public Response checkAvailableNickname(@RequestParam String nickname) {
        return new Response(AuthConstant.AVAILABLE, authService.checkAvailableNickname(nickname));
    }

    @Override
    @GetMapping("/tel")
    public Response checkAvailableTel(@RequestParam String tel) {
        return new Response(AuthConstant.AVAILABLE, authService.checkAvailableTel(tel));
    }

    @Override
    @PostMapping("/tel")
    public Response sendAuthorizationCode(@RequestParam String tel) {
        authService.sendAuthorizationCode(tel);
        return new Response();
    }

    @Override
    @PostMapping("/tel/verify")
    public Response verifyAuthorizationCode(@RequestBody TelVerifyRequest telVerifyRequestDto) {
        return new Response(AuthConstant.VERIFY, authService.verifyAuthorizationCode(telVerifyRequestDto));
    }

    @Override
    @PostMapping("/join")
    public Response join(@RequestBody JoinRequest joinRequestDto) {
        authService.join(joinRequestDto);
        return new Response();
    }

    @Override
    @PostMapping("/login")
    public Response login(@RequestBody LoginRequest loginRequestDto, HttpServletResponse servletResponse) {
        return new Response(AuthConstant.USER, authService.login(loginRequestDto, servletResponse));
    }

}
