package com.d106.campu.payment.controller.doc;

import com.d106.campu.common.response.Response;
import com.d106.campu.payment.dto.PaymentDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "07. 결제 관련 API", description = "결제 및 취소 API")
public interface PaymentControllerDoc {

    @Operation(summary = "결제 준비", description = "결제 준비를 위한 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "결제 준비 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = PaymentPrepareResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "400", description = "조건 유효성 검사 오류", content = @Content),
    })
    Response preparePayment(PaymentDto.PrepareRequest prepareRequest);

    @Operation(summary = "결제 완료", description = "결제 완료를 위한 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "결제 완료 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = PaymentCompleteResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "400", description = "조건 유효성 검사 오류", content = @Content),
    })
    Response completePayment(PaymentDto.CompleteRequest completeRequestDto);

    @Operation(summary = "결제 취소", description = "결제 취소를 위한 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "결제 취소 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = PaymentCancelResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "400", description = "조건 유효성 검사 오류", content = @Content),
    })
    Response cancelPayment(PaymentDto.CancelRequest cancelRequestDto);

    class PaymentPrepareResponse {
        public PaymentDto.PrepareResponse preparePayment;
    }

    class PaymentCompleteResponse {
        public PaymentDto.CompleteResponse completePayment;
    }

    class PaymentCancelResponse {
        public PaymentDto.CancelResponse cancelPayment;
    }

}
