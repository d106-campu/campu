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
import jakarta.validation.constraints.Pattern;
import java.util.List;
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
        @ApiResponse(responseCode = "400", description = "조건 유효성 검사 오류",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "fail", description = "요청 실패")),
                @SchemaProperty(name = "code", schema = @Schema(description = "요청 실패 코드")),
                @SchemaProperty(name = "message", schema = @Schema(description = "실패한 메시지")),
            })
        )
    })
    Response getCampsiteList(
        Pageable pageable,
        @Pattern(regexp = RegExpression.induty, message = "Use among these: caravan, autocamping, camping, glamping") String induty,
        @Pattern(regexp = RegExpression.theme, message = "Use among these: summer, trails, activity, spring, autumn, winter, sunset, sunrise, watersports, fishing, airsports, skiing") String theme
    );

    class CampsiteListResponse {
        public List<CampsiteDto.Response> campsiteList;
        public Pageable pageable;
    }

}
