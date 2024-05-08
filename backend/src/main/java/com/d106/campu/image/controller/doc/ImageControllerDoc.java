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
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "10. 이미지 관련 API", description = "이미지를 업로드/다운로드 할 수 있다.")
public interface ImageControllerDoc {

    @Operation(summary = "프로필 이미지 업로드", description = "프로필 이미지를 업로드한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "성공시 업로드한 프로필 이미지 URL을 반환한다.",
            content = @Content(schemaProperties = {

                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = ImageDto.ProfileResponse.class)),
            }))
    })
    Response uploadUserProfileImage(@Image(allowedExtensionList = {ImageExtension.JPG, ImageExtension.PNG, ImageExtension.GIF,
        ImageExtension.BMP, ImageExtension.WEBP}, message = "invalid image") MultipartFile profileImage);

    @Operation(summary = "캠핑장 대표 이미지 업로드", description = "캠핑장 대표 이미지를 업로드한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "성공시 업로드한 캠핑장 대표 이미지 URL을 반환한다.",
            content = @Content(schemaProperties = {

                @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                @SchemaProperty(name = "data", schema = @Schema(implementation = ImageDto.ThumbnailResponse.class)),
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
                @SchemaProperty(name = "data", schema = @Schema(implementation = ImageDto.MapResponse.class)),
            }))
    })
    Response uploadCampsiteMapImage(@NotNull Long campsiteId,
        @Image(allowedExtensionList = {ImageExtension.JPG, ImageExtension.PNG, ImageExtension.GIF,
            ImageExtension.BMP, ImageExtension.WEBP}, message = "invalid image") MultipartFile mapImage);

}