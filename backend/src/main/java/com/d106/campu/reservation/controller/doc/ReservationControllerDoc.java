package com.d106.campu.reservation.controller.doc;

import com.d106.campu.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "06. 예약 관련 API", description = "캠핑장 예약과 관련된 요청을 처리하는 API")
public interface ReservationControllerDoc {

    @Operation(summary = "사용자 예약 내역 조회", description = "사용자의 예약 내역을 조회한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "예약 내역 조회 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공"))
            })
        )
    })
    Response getReservationList();

}
