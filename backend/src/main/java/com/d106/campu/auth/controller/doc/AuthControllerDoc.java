package com.d106.campu.auth.controller.doc;

import com.d106.campu.auth.constant.RegExpressions;
import com.d106.campu.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
        @ApiResponse(responseCode = "400", description = "아이디 유효성 검사 오류",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "fail", description = "요청 실패")),
                @SchemaProperty(name = "code", schema = @Schema(description = "요청 실패 코드")),
                @SchemaProperty(name = "message", schema = @Schema(description = "실패한 메시지")),
            }))
    })
    Response checkAvailableAccount(
        @NotBlank(message = "not blank")
        @Size(min = 6, max = 12, message = "account length not valid")
        @Pattern(regexp = RegExpressions.account, message = "account format not valid") String account
    );

    class AvailableResponse {

        public Boolean available;
    }

}
