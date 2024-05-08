package com.d106.campu.notification.controller.doc;

import com.d106.campu.common.response.Response;
import com.d106.campu.notification.dto.NotificationDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Tag(name = "08. 알림 관련 API", description = "알림 관련 API")
public interface NotificationControllerDoc {

    @Operation(summary = "SSE 연결 V1 (JWT 토큰 기반)", description = "SSE 연결을 위한 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "SSE 연결 성공",
            content = @Content(schema = @Schema(implementation = SseEmitter.class))
        ),
        @ApiResponse(responseCode = "400", description = "SSE 연결 실패", content = @Content)
    })
    ResponseEntity<SseEmitter> connectSseV1();

    @Operation(summary = "SSE 연결 V2 (URL 패러미터 기반)", description = "SSE 연결을 위한 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "SSE 연결 성공",
            content = @Content(schema = @Schema(implementation = SseEmitter.class))
        ),
        @ApiResponse(responseCode = "400", description = "SSE 연결 실패", content = @Content)
    })
    ResponseEntity<SseEmitter> connectSseV2(@NotNull(message = "not null") Long userId);

    @Operation(summary = "알림 저장 테스트", description = "알림 저장 테스트를 위한 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "알림 저장 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공"))
            })),
        @ApiResponse(responseCode = "400", description = "알림 저장 실패", content = @Content)
    })
    Response saveNotification(@Valid NotificationDto.SaveRequest saveRequestDto);

    @Operation(summary = "알림 삭제 테스트", description = "알림 삭제 테스트를 위한 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "알림 삭제 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공"))
            })),
        @ApiResponse(responseCode = "400", description = "알림 삭제 실패", content = @Content)
    })
    Response deleteNotification(@NotNull Long notificationId);

    @Operation(summary = "이벤트 발생 테스트", description = "이벤트 발생 테스트를 위한 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "이벤트 발생 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공"))
            })),
        @ApiResponse(responseCode = "400", description = "이벤트 발생 실패", content = @Content)
    })
    Response publishEvent(@Valid NotificationDto.PublishEventRequest publishEventRequestDto);

    @Operation(summary = "전체 알림 반환", description = "전체 알림을 반환한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "전체 알림 반환 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = NotificationListResponse.class))
            })
        ),
        @ApiResponse(responseCode = "400", description = "전체 알림 반환 실패", content = @Content)
    })
    Response getNotificationList(Pageable pageable);

    class NotificationListResponse {
        public Page<NotificationDto.ListResponse> notificationList;
    }

}
