package com.d106.campu.owner.controller.doc;

import com.d106.campu.campsite.dto.CampsiteDto;
import com.d106.campu.common.response.Response;
import com.d106.campu.owner.dto.OwnerDto;
import com.d106.campu.reservation.dto.ReservationDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

@Validated
@Tag(name = "12. 사장님 관련 API", description = "사장님 권한이 필요한 요청을 처리하는 API")
public interface OwnerControllerDoc {

    @Operation(summary = "사업자 번호기반 캠핑장 등록", description = "사업자 번호를 기반하여 캠핑장을 등록한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "사업자 번호 기반 캠핑장 등록 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            })
        ),
        @ApiResponse(responseCode = "400", description = "조건 유효성 검사 오류", content = @Content),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content),
        @ApiResponse(responseCode = "404", description = "해당 사업자 번호의 캠핑장을 찾지 못함", content = @Content),
        @ApiResponse(responseCode = "409", description = "이미 등록된 사업자 번호", content = @Content),
    })
    Response registerCampsite(String bizrno);

    @Operation(summary = "사장님 캠핑장 목록 조회", description = "사장님이 관리하는 캠핑장 목록을 조회하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "캠핑장 목록 조회 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = CampsiteDto.CampsiteListResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "400", description = "조건 유효성 검사 오류", content = @Content),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content)
    })
    Response getOwnerCampsiteList(Pageable pageable);

    @Operation(summary = "사장님 캠핑장 상세 정보 수정", description = "사장님이 관리하는 캠핑장의 상세정보를 수정하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "캠핑장 상세정보 수정 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            })
        ),
        @ApiResponse(responseCode = "400", description = "조건 유효성 검사 오류", content = @Content),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content)
    })
    Response updateCampsiteDetail(OwnerDto.CampsiteUpdateRequest updateRequestDto);

    @Operation(summary = "사장님 캠핑장별 예약 목록 조회", description = "사장님이 관리하는 캠핑장별로 <strong>특정 날짜가 포함된 예약 목록을 조회</strong>하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "예약 목록 조회 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = ReservationWithUserListResponse.class)),
            })
        ),
        @ApiResponse(responseCode = "400", description = "조건 유효성 검사 오류", content = @Content),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content)
    })
    Response getOwnerReservationListByCampsite(
        @Parameter(description = "조회하려는 캠핑장 아이디") Long campsiteId,
        @Parameter(description = "조회하려는 날짜. `yyyy-mm-dd`형식. 입력하지 않으면 기본값은 오늘.") LocalDate date
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

    @Operation(summary = "캠핑장 방 등록", description = "사장님이 캠핑장의 방을 등록하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "캠핑장 방 등록 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            })),
        @ApiResponse(responseCode = "400", description = "캠핑장 정보 유효성 검사 오류", content = @Content),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content),
        @ApiResponse(responseCode = "404", description = "캠핑장을 찾을 수 없음", content = @Content)
    })
    Response createRoom(MultipartFile file, @Valid OwnerDto.RoomCreateRequest createRequestDto);

    @Operation(summary = "캠핑장 방 목록 조회", description = "사장님이 캠핑장의 방의 목록을 조회하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "캠핑장 방 목록 조회 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = RoomListResponse.class)),
            })),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content),
        @ApiResponse(responseCode = "404", description = "캠핑장을 찾을 수 없음", content = @Content)
    })
    Response getRoomList(Long campsiteId);

    @Operation(summary = "캠핑장 방 수정", description = "사장님이 캠핑장의 방을 수정하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "캠핑장 방 수정 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            })),
        @ApiResponse(responseCode = "400", description = "캠핑장 정보 유효성 검사 오류", content = @Content),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content),
        @ApiResponse(responseCode = "404", description = "캠핑장의 방을 찾을 수 없음", content = @Content)
    })
    Response updateRoom(Long roomId, MultipartFile file, @Valid OwnerDto.RoomUpdateRequest updateRequestDto);

    @Operation(summary = "캠핑장 방 삭제", description = "사장님이 캠핑장의 방을 삭제하는 API를 호출한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "캠핑장 방 삭제 성공",
            content = @Content(schemaProperties = {
                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            })),
        @ApiResponse(responseCode = "401", description = "권한 없음", content = @Content),
        @ApiResponse(responseCode = "404", description = "캠핑장의 방을 찾을 수 없음", content = @Content)
    })
    Response deleteRoom(Long roomId);

    class CreateCampsiteResponse {
        public CampsiteDto.CreateResponse campsite;
    }

    class ReservationWithUserListResponse {
        public List<ReservationDto.ResponseWithUser> reservationList;
    }

    class RoomListResponse {
        public List<OwnerDto.RoomResponse> roomList;
    }

}
