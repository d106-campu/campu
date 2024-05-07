package com.d106.campu.mypage.controller.doc;

import com.d106.campu.common.response.Response;
import com.d106.campu.mypage.constant.DateType;
import com.d106.campu.reservation.controller.doc.ReservationControllerDoc;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestParam;

@Validated
@Tag(name = "02. 인증 관련 API", description = "JWT 토큰을 요구하지 않는 API (회원가입, 로그인 등)")
public interface MyPageControllerDoc {

    @Operation(summary = "사용자 예약 내역 조회", description = "사용자의 예약 내역을 조회한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "예약 내역 조회 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = ReservationControllerDoc.ReservationListResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content)
    })
    Response getReservationList(Pageable pageable, @RequestParam DateType dateType);

}
