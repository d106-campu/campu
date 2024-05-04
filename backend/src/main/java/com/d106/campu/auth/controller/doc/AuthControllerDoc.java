package com.d106.campu.auth.controller.doc;

import com.d106.campu.auth.dto.AuthDto;
import com.d106.campu.common.annotation.Account;
import com.d106.campu.common.annotation.Nickname;
import com.d106.campu.common.annotation.Tel;
import com.d106.campu.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;

@Validated
@Tag(name = "02. 인증 관련 API", description = "JWT 토큰을 요구하지 않는 API (회원가입, 로그인 등)")
public interface AuthControllerDoc {

    @Operation(summary = "아이디 중복확인", description = "회원가입에 사용 가능한 아이디인지 확인한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "아이디 사용 가능 여부를 반환",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = AvailableResponse.class)),
            })),
        @ApiResponse(responseCode = "400", description = "아이디 유효성 검사 오류", content = @Content)
    })
    Response checkAvailableAccount(@Account String account);

    @Operation(summary = "닉네임 중복확인", description = "회원가입에 사용 가능한 닉네임인지 확인한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "닉네임 사용 가능 여부를 반환",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = AvailableResponse.class)),
            })),
        @ApiResponse(responseCode = "400", content = @Content)
    })
    Response checkAvailableNickname(@Nickname String nickname);

    @Operation(summary = "휴대폰 번호 중복확인", description = "회원가입에 사용 가능한 휴대폰 번호인지 확인한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "휴대폰 번호 사용 가능 여부를 반환",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = AvailableResponse.class)),
            })),
        @ApiResponse(responseCode = "400", description = "휴대폰 번호 유효성 검사 오류", content = @Content)
    })
    Response checkAvailableTel(@Tel String tel);

    @Operation(summary = "휴대폰 인증 번호 전송", description = "회원가입에 필요한 휴대폰 인증 번호를 전송한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "휴대폰 인증 번호 전송 여부를 반환",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공"))
            })),
        @ApiResponse(responseCode = "400", description = "휴대폰 번호 유효성 검사 오류", content = @Content),
        @ApiResponse(responseCode = "409", description = "이미 가입된 휴대폰 번호", content = @Content)
    })
    Response sendAuthorizationCode(@Tel String tel);

    @Operation(summary = "휴대폰 인증 번호 확인", description = "회원가입에 필요한 휴대폰 인증 번호를 확인한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "휴대폰 인증 번호 일치 여부를 확인",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = VerifyResponse.class))
            })),
        @ApiResponse(responseCode = "400", description = "휴대폰 번호 유효성 검사 오류", content = @Content),
        @ApiResponse(responseCode = "401", description = "휴대폰 인증 번호 일치 X", content = @Content),
        @ApiResponse(responseCode = "404", description = "인증번호 전송된 휴대폰 번호 X", content = @Content),
        @ApiResponse(responseCode = "409", description = "이미 가입된 휴대폰 번호", content = @Content)
    })
    Response verifyAuthorizationCode(@Valid AuthDto.TelVerifyRequest telVerifyRequestDto);

    @Operation(summary = "회원가입", description = "회원가입을 한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "회원가입 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            })),
        @ApiResponse(responseCode = "400", description = "요청 유효성 검사 오류", content = @Content),
        @ApiResponse(responseCode = "401", description = "휴대폰 인증 X", content = @Content),
        @ApiResponse(responseCode = "409", description = "입력 데이터 충돌", content = @Content)
    })
    Response join(@Valid AuthDto.JoinRequest joinRequestDto);

    @Operation(summary = "로그인", description = "로그인을 한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "로그인 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = UserResponse.class))
            })),
        @ApiResponse(responseCode = "400", description = "요청 유효성 검사 오류", content = @Content),
        @ApiResponse(responseCode = "401", description = "아이디 or 비밀번호가 틀림", content = @Content)
    })
    Response login(@Valid AuthDto.LoginRequest loginRequestDto);

    class AvailableResponse {
        public Boolean available;
    }

    class VerifyResponse {
        public Boolean verify;
    }

    class UserResponse {
        public AuthDto.LoginRequest user;
    }

}
