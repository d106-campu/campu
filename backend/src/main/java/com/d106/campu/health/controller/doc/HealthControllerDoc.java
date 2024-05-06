package com.d106.campu.health.controller.doc;

import com.d106.campu.common.response.Response;
import com.d106.campu.health.dto.HealthDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "01. 서버 상태 관련 API", description = "서버의 상태와 관련된 요청을 처리하는 API")
public interface HealthControllerDoc {

    @Operation(summary = "서버 상태 확인", description = "서버의 상태를 확인한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "서버 상태 확인 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            })
        ),
        @ApiResponse(responseCode = "400", description = "서버 상태 확인 실패", content = @Content)
    })
    Response checkHealth();

    @Operation(summary = "로그 info 확인", description = "로그 info 상태를 확인한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "로그 info 상태 확인 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            })
        ),
        @ApiResponse(responseCode = "400", description = "로그 info 상태 확인 실패", content = @Content)
    })
    Response checkLogInfo();

    @Operation(summary = "로그 warn 확인", description = "로그 warn 상태를 확인한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "로그 warn 상태 확인 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            })
        ),
        @ApiResponse(responseCode = "400", description = "로그 warn 상태 확인 실패", content = @Content)
    })
    Response checkLogWarn();

    @Operation(summary = "로그 error 확인", description = "로그 error 상태를 확인한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "로그 error 상태 확인 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            })
        ),
        @ApiResponse(responseCode = "400", description = "로그 error 확인 실패", content = @Content)
    })
    Response checkLogError();

    @Operation(summary = "캠핑장 원본 데이터 확인", description = "캠핑장 원본 데이터를 확인한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "캠핑장 원본 데이터 확인 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = CampsiteOriginalResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "400", description = "캠핑장 원본 데이터 확인 실패", content = @Content)
    })
    Response checkCampsiteOriginal(Long campsiteOriginalId);

    class CampsiteOriginalResponse {
        public HealthDto.CampsiteOriginalResponse campsiteOriginal;
    }

}
