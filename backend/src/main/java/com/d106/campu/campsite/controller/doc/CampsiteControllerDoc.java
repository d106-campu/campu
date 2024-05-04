package com.d106.campu.campsite.controller.doc;

import com.d106.campu.campsite.constant.RegExpression;
import com.d106.campu.campsite.dto.CampsiteDto;
import com.d106.campu.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;

@Validated
@Tag(name = "04. 캠핑장 관련 API", description = "캠핑장 조회/등록/관리 관련된 요청을 처리하는 API")
public interface CampsiteControllerDoc {

    @Operation(summary = "캠핑장 목록 조회", description = "조건에 맞는 캠핑장 목록을 조회하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "캠핑장 목록 조회 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = CampsiteListResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "400", description = "조건 유효성 검사 오류", content = @Content)
    })
    Response getCampsiteList(
        Pageable pageable,
        @Pattern(regexp = RegExpression.induty, message = "induty should be among these: caravan, autocamping, camping, glamping") String induty,
        @Pattern(regexp = RegExpression.theme, message = "theme should be among these: summer, trail, activity, spring, autumn, winter, sunset, sunrise, watersports, fishing, airsports, skiing") String theme
    );

    @Operation(summary = "캠핑장 등록", description = "사장님이 캠핑장 관리 페이지에서 캠핑장을 등록하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "캠핑장 등록 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = CreateCampsiteResponse.class)),
            })),
        @ApiResponse(responseCode = "400", description = "캠핑장 정보 유효성 검사 오류", content = @Content)
    })
    Response createCampsite(@Valid CampsiteDto.CreateRequest createRequestDto);

    @Operation(summary = "캠핑장 좋아요", description = "특정 캠핑장에 대해 좋아요 여부를 설정/제거하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "캠핑장 좋아요 업데이트 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = CampsiteLikeResponse.class)),
            })),
        @ApiResponse(responseCode = "400", description = "캠핑장 정보 유효성 검사 오류", content = @Content)
    })
    Response likeCampsite(Long campsiteId);

    @Operation(summary = "캠핑장 방 조회", description = "특정 캠핑장의 방 목록을 조회하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "방 목록 조회 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = CampsiteRoomListResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "400", description = "조건 유효성 검사 오류", content = @Content)
    })
    Response getCampsiteRoomList(long campsiteId);

    class CampsiteListResponse {
        public Page<CampsiteDto.Response> campsiteList;
        public Pageable pageable;
    }

    class CreateCampsiteResponse {
        public CampsiteDto.CreateResponse campsite;
    }

    class CampsiteLikeResponse {
        public CampsiteDto.LikeResponse likeResponse;
    }

    class CampsiteRoomListResponse {
        public List roomList;
    }

}
