package com.d106.campu.image.controller;

import com.d106.campu.common.response.Response;
import com.d106.campu.image.constant.ImageConstant;
import com.d106.campu.image.controller.doc.ImageControllerDoc;
import com.d106.campu.image.dto.ImageDto;
import com.d106.campu.image.service.ImageService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/image")
@RequiredArgsConstructor
@RestController
public class ImageController implements ImageControllerDoc {

    private final ImageService imageService;

    @Override
    @PostMapping(value = "/user/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response uploadUserProfileImage(@RequestPart("profileImage") MultipartFile profileImage) {
        return new Response(ImageConstant.PROFILE_IMAGE, imageService.uploadUserProfileImage(profileImage));
    }

    @Override
    @PostMapping(value = "/campsite/{campsiteId}/thumbnail", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response uploadCampsiteThumbnailImage(@PathVariable("campsiteId") Long campsiteId,
        @RequestPart("thumbnailImage") MultipartFile thumbnailImage) {
        return new Response(ImageConstant.THUMBNAIL_IMAGE,
            imageService.uploadCampsiteThumbnailImage(campsiteId, thumbnailImage));
    }

    @Override
    @PostMapping(value = "/campsite/{campsiteId}/map", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response uploadCampsiteMapImage(@PathVariable("campsiteId") Long campsiteId,
        @RequestPart("mapImage") MultipartFile mapImage) {
        return new Response(ImageConstant.MAP_IMAGE, imageService.uploadCampsiteMapImage(campsiteId, mapImage));
    }

    @Override
    @PostMapping(value = "/campsite/{campsiteId}/general", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response uploadCampsiteGeneralImageList(@PathVariable("campsiteId") Long campsiteId,
        @RequestPart("generalImageList") List<MultipartFile> generalImageList) {
        return new Response(ImageConstant.GENERAL_IMAGE_LIST,
            imageService.uploadCampsiteGeneralImageList(campsiteId, generalImageList));
    }

    @Override
    @PatchMapping(value = "/campsite/{campsiteId}/general", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response updateCampsiteGeneralImageList(@PathVariable("campsiteId") Long campsiteId,
        @RequestPart(value = "deleteImageList", required = false) ImageDto.UploadListRequest uploadListRequest,
        @RequestPart(value = "insertImageList", required = false) List<MultipartFile> generalImageList) {
        return new Response(ImageConstant.GENERAL_IMAGE_LIST,
            imageService.updateCampsiteGeneralImageList(campsiteId, uploadListRequest, generalImageList));
    }

    @Override
    @DeleteMapping(value = "/campsite/{campsiteId}/general", produces = MediaType.APPLICATION_JSON_VALUE)
    public Response deleteAll(@PathVariable("campsiteId") Long campsiteId) {
        imageService.deleteAll(campsiteId);
        return new Response();
    }

    @Override
    @DeleteMapping(value = "/user/profile", produces = MediaType.APPLICATION_JSON_VALUE)
    public Response deleteProfileImage() {
        imageService.deleteProfileImage();
        return new Response();
    }

    @Override
    @DeleteMapping(value = "/campsite/{campsiteId}/thumbnail", produces = MediaType.APPLICATION_JSON_VALUE)
    public Response deleteThumbnailImage(@PathVariable("campsiteId") Long campsiteId) {
        imageService.deleteThumbnailImage(campsiteId);
        return new Response();
    }

}
