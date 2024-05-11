package com.d106.campu.review.controller.doc;

import com.d106.campu.common.response.Response;
import com.d106.campu.review.dto.ReviewDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Tag(name = "11. 리뷰 관련 API", description = "리뷰와 관련된 요청을 처리하는 API")
public interface ReviewControllerDoc {

    @Operation(summary = "캠핑장 평점 조회", description = "캠핑장 평점을 조회하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "캠핑장 평점 조회 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = CampsiteScoreResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "404", description = "존재하지 않는 캠핑장", content = @Content)
    })
    Response getCampsiteScore(Long campsiteId);

    @Operation(summary = "캠핑장 리뷰 목록 조회", description = "캠핑장의 리뷰들을 조회하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "캠핑장 리뷰 목록 조회 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = ReviewListResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "404", description = "존재하지 않는 캠핑장", content = @Content)
    })
    Response getReviewList(Long campsiteId, Pageable pageable);

    @Operation(summary = "리뷰 삭제", description = "리뷰를 삭제하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "리뷰 삭제 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            })
        ),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content),
        @ApiResponse(responseCode = "404", description = "존재하지 않는 리뷰", content = @Content)
    })
    Response delete(Long reviewId);

    class CampsiteScoreResponse {
        public double campsiteScore;
    }

    class ReviewListResponse {
        public Page<ReviewDto.Response> reviewList;
    }

}
