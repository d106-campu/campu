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
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "11. 리뷰 관련 API", description = "리뷰와 관련된 요청을 처리하는 API")
public interface ReviewControllerDoc {

    @Operation(summary = "리뷰 등록", description = "리뷰를 등록하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "리뷰 등록 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            })
        ),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content),
        @ApiResponse(responseCode = "404", description = "존재하지 않는 예약", content = @Content),
        @ApiResponse(responseCode = "409", description = "이미 작성한 예약건 or 예약이 완료되지 않음", content = @Content)
    })
    Response create(List<MultipartFile> files, @Valid ReviewDto.CreateRequest createRequestDto);

    @Operation(summary = "캠핑장 평점 조회", description = "캠핑장 평점을 조회하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "캠핑장 평점 조회 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = ReviewDto.ScoreResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "404", description = "존재하지 않는 캠핑장", content = @Content)
    })
    Response getCampsiteScore(Long campsiteId);

    @Operation(summary = "리뷰 상세 조회", description = "리뷰를 상세 조회하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "리뷰 상세 조회 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = ReviewDetailResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "404", description = "존재하지 않는 리뷰", content = @Content)
    })
    Response getReviewDetail(Long reviewId, HttpServletRequest request);

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

    class ReviewDetailResponse {
        public ReviewDto.DetailResponse reviewDetail;
    }

}
