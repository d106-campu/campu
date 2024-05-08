package com.d106.campu.mypage.controller.doc;

import com.d106.campu.common.annotation.Nickname;
import com.d106.campu.common.response.Response;
import com.d106.campu.mypage.constant.DateType;
import com.d106.campu.mypage.constant.UseType;
import com.d106.campu.mypage.dto.MyPageDto.MyCampsiteResponse;
import com.d106.campu.mypage.dto.MyPageDto.MyReservationResponse;
import com.d106.campu.mypage.dto.MyPageDto.MyReviewResponse;
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

    @Operation(summary = "내가 찜한 캠핑장 조회", description = "자신이 찜한 캠핑장을 조회한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "내가 찜한 캠핑장 조회 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = CampsiteLikeListResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content)
    })
    Response getCampsiteList(Pageable pageable);

    @Operation(summary = "프로필 설정 - 닉네임 수정", description = "닉네임을 수정한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "닉네임 수정 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            })
        ),
        @ApiResponse(responseCode = "400", description = "닉네임 유효성 검사 오류", content = @Content),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content),
        @ApiResponse(responseCode = "404", description = "유저를 찾지 못함", content = @Content),
        @ApiResponse(responseCode = "409", description = "닉네임 중복", content = @Content)
    })
    Response updateNickname(@Nickname String nickname);

    class ReservationListResponse {
        public Page<MyReservationResponse> reservationList;
    }

    class ReviewListResponse {
        public Page<MyReviewResponse> reviewList;
    }

    class CampsiteLikeListResponse {
        public Page<MyCampsiteResponse> campsiteList;
    }

}
