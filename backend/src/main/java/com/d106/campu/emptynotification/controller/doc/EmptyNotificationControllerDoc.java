package com.d106.campu.emptynotification.controller.doc;

import com.d106.campu.common.response.Response;
import com.d106.campu.emptynotification.dto.EmptyNotificationDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "09. 빈 자리 알림 관련 API", description = "빈 자리 알림을 등록/삭제 요청을 처리하는 API")
public interface EmptyNotificationControllerDoc {

    @Operation(summary = "빈 자리 알림 등록", description = "빈 자리 알림을 등록하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "빈 자리 알림 등록 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            })
        ),
        @ApiResponse(responseCode = "400", description = "입력 데이터 유효성 검사 오류", content = @Content),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content),
        @ApiResponse(responseCode = "404", description = "유저 or 방을 못찾음", content = @Content),
        @ApiResponse(responseCode = "409", description = "이미 등록된 빈자린 알림", content = @Content),
        @ApiResponse(responseCode = "429", description = "빈자리 알림 등록 횟수 초과", content = @Content)
    })
    Response create(@Valid EmptyNotificationDto.CreateRequest createRequestDto);

    @Operation(summary = "빈 자리 알림 삭제", description = "빈 자리 알림을 삭제하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "빈 자리 알림 삭제 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            })
        ),
        @ApiResponse(responseCode = "400", description = "입력 데이터 유효성 검사 오류", content = @Content),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content),
        @ApiResponse(responseCode = "404", description = "유저 or 빈자리 알림을 못찾음", content = @Content),
    })
    Response delete(Long roomId);

}
