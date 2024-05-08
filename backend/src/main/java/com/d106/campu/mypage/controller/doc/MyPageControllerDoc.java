package com.d106.campu.mypage.controller.doc;

import com.d106.campu.common.response.Response;
import com.d106.campu.mypage.constant.DateType;
import com.d106.campu.mypage.constant.UseType;
import com.d106.campu.mypage.dto.MyPageDto.ReservationResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;

@Validated
@Tag(name = "03. 마이 페이지 API", description = "마이페이지 관련 API (예약내역, 내가 쓴 리뷰 조회 등)")
public interface MyPageControllerDoc {

    @Operation(summary = "예약 내역 조회", description = "사용자의 예약 내역을 조회한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "예약 내역 조회 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = ReservationListResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content)
    })
    Response getReservationList(Pageable pageable, DateType dateType, UseType useType);

    @Operation(summary = "내가 쓴 리뷰 조회", description = "자신이 작성한 리뷰를 조회한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "내가 쓴 리뷰 조회 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = ReviewListResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content)
    })
    Response getReviewList(Pageable pageable, DateType dateType);

    class ReservationListResponse {
        public Page<ReservationResponse> reservationList;
        public Pageable pageable;
    }

    class ReviewListResponse {
        public Page<ReservationResponse> reviewList;
        public Pageable pageable;
    }

}
