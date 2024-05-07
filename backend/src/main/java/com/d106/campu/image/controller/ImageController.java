package com.d106.campu.image.controller;

import com.d106.campu.common.response.Response;
import com.d106.campu.image.constant.ImageConstant;
import com.d106.campu.image.controller.doc.ImageControllerDoc;
import com.d106.campu.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
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

    @PostMapping(value = "/campsite", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response uploadProfileImage(@RequestPart MultipartFile profileImage) {
        return new Response(ImageConstant.PROFILE_IMAGE, imageService.uploadProfileImage(profileImage));
    }

}
