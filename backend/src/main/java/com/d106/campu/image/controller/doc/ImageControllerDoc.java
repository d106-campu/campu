package com.d106.campu.image.controller.doc;

import com.d106.campu.common.annotation.Image;
import com.d106.campu.common.response.Response;
import com.d106.campu.image.constant.ImageExtension;
import com.d106.campu.image.dto.ImageDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "10. 이미지 관련 API", description = "이미지를 업로드/다운로드 할 수 있다.")
public interface ImageControllerDoc {

    @Operation(summary = "프로필 이미지 업로드", description = "프로필 이미지를 업로드한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "성공시 업로드한 프로필 이미지 URL을 반환한다.",
            content = @Content(schemaProperties = {

                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = ProfileResponse.class)),
            }))
    })
    Response uploadUserProfileImage(@Image(allowedExtensionList = {ImageExtension.JPG, ImageExtension.PNG, ImageExtension.GIF,
        ImageExtension.BMP, ImageExtension.WEBP}, message = "invalid image") MultipartFile profileImage);

    @Operation(summary = "캠핑장 대표 이미지 업로드", description = "캠핑장 대표 이미지를 업로드한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "성공시 업로드한 캠핑장 대표 이미지 URL을 반환한다.",
            content = @Content(schemaProperties = {

                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = ThumbnailResponse.class)),
            }))
    })
    Response uploadCampsiteThumbnailImage(@NotNull Long campsiteId,
        @Image(allowedExtensionList = {ImageExtension.JPG, ImageExtension.PNG, ImageExtension.GIF,
            ImageExtension.BMP, ImageExtension.WEBP}, message = "invalid image") MultipartFile thumbnailImage);

    @Operation(summary = "캠핑장 배치 이미지 업로드", description = "캠핑장 배치 이미지를 업로드한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "성공시 업로드한 캠핑장 배치 이미지 URL을 반환한다.",
            content = @Content(schemaProperties = {

                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = MapResponse.class)),
            }))
    })
    Response uploadCampsiteMapImage(@NotNull Long campsiteId,
        @Image(allowedExtensionList = {ImageExtension.JPG, ImageExtension.PNG, ImageExtension.GIF,
            ImageExtension.BMP, ImageExtension.WEBP}, message = "invalid image") MultipartFile mapImage);

    /* TODO: 리스트로 받을 때 유효성 검사를 기존 @Image 어노테이션을 이용하여 할 수 있는지 알아봐야 한다. */
    @Operation(summary = "캠핑장 일반 이미지 업로드", description = "캠핑장 일반 이미지를 업로드한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "성공시 업로드한 캠핑장 일반 이미지 URL을 반환한다.",
            content = @Content(schemaProperties = {

                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = ListGeneralResponse.class)),
            }))
    })
    Response uploadCampsiteGeneralImageList(@NotNull Long campsiteId, List<MultipartFile> generalImageList);

    @Operation(summary = "캠핑장 일반 이미지 업데이트", description = "캠핑장 일반 이미지를 업데이트한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "성공시 업데이트한 캠핑장 일반 이미지 URL을 반환한다.",
            content = @Content(schemaProperties = {

                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = ListGeneralResponse.class)),
            }))
    })
    Response updateCampsiteGeneralImageList(@NotNull Long campsiteId, ImageDto.UploadListRequest uploadListRequest,
        List<MultipartFile> generalImageList);

    @Operation(summary = "캠핑장 일반 이미지 모두 삭제", description = "캠핑장 일반 이미지를 모두 삭제한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "성공시 일반 이미지를 모두 삭제한다.",
            content = @Content(schemaProperties = {

                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            }))
    })
    Response deleteAll(Long campsiteId);

    @Operation(summary = "프로필 이미지 삭제", description = "프로필 이미지를 삭제한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "성공시 프로필 이미지를 삭제한다.",
            content = @Content(schemaProperties = {

                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            }))
    })
    Response deleteProfileImage();

    @Operation(summary = "캠핑장 대표 이미지 삭제", description = "캠핑장 대표 이미지를 삭제한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "성공시 캠핑장 대표 이미지를 삭제한다.",
            content = @Content(schemaProperties = {

                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
            }))
    })
    Response deleteThumbnailImage(Long campsiteId);

    class ProfileResponse {
        public String profileImage;
    }

    class ThumbnailResponse {
        public String thumbnailImage;
    }

    class MapResponse {
        public String mapImage;
    }

    class ListGeneralResponse {
        public List<String> generalImageList;
    }

}