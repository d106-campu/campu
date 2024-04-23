package com.d106.campu.health.controller.doc;

import com.d106.campu.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "01. 서버 상태 관련 API", description = "서버의 상태와 관련된 요청을 처리하는 API")
public interface HealthControllerDoc {

  @Operation(summary = "서버 상태 확인", description = "서버의 상태를 확인한다.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "서버 상태 확인 성공",
          content = @Content(schemaProperties = {
              @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
          })
      )
  })
  Response checkHealth();

}
