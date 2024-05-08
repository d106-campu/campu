package com.d106.campu.image.service;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.exception.code.CampsiteExceptionCode;
import com.d106.campu.campsite.repository.jpa.CampsiteRepository;
import com.d106.campu.common.exception.InvalidException;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.exception.code.CommonExceptionCode;
import com.d106.campu.common.util.SecurityHelper;
import com.d106.campu.image.constant.ImageConstant;
import com.d106.campu.image.dto.ImageDto;
import com.d106.campu.image.exception.code.ImageExceptionCode;
import com.d106.campu.image.mapper.ImageMapper;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.exception.code.UserExceptionCode;
import com.d106.campu.user.repository.jpa.UserRepository;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class ImageService {

    @Value("${app.base-url}")
    private String baseUrl;

    private final UserRepository userRepository;
    private final CampsiteRepository campsiteRepository;
    private final ImageMapper imageMapper;
    private final SecurityHelper securityHelper;

    @Transactional
    public ImageDto.ProfileResponse uploadUserProfileImage(MultipartFile profileImage) {
        User user = userRepository.findByAccount(securityHelper.getLoginAccount())
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
        Path basePath = ImageConstant.USER_DIR.resolve(user.getId().toString()).resolve(ImageConstant.PROFILE);
        String fileName = saveFile(basePath, profileImage);
        String postfix = String.join("/", user.getId().toString(), ImageConstant.PROFILE, fileName);
        String profileImageUrl = StringUtils.join(ImageConstant.USER_URL, postfix);

        user.setProfileImageUrl(profileImageUrl);
        return imageMapper.toProfileResponseDto(baseUrl, userRepository.save(user));
    }

    @Transactional
    public ImageDto.ThumbnailResponse uploadCampsiteThumbnailImage(Long campsiteId, MultipartFile thumbnailImage) {
        Campsite campsite = campsiteRepository.findById(campsiteId)
            .orElseThrow(() -> new NotFoundException(CampsiteExceptionCode.CAMPSITE_NOT_FOUND));
        if (!StringUtils.equals(campsite.getUser().getAccount(), securityHelper.getLoginAccount())) {
            throw new InvalidException(CommonExceptionCode.UNAUTHORIZED);
        }
        Path basePath = ImageConstant.CAMPSITE_DIR.resolve(campsite.getId().toString()).resolve(ImageConstant.THUMBNAIL);
        String fileName = saveFile(basePath, thumbnailImage);
        String postfix = String.join("/", campsite.getId().toString(), ImageConstant.THUMBNAIL, fileName);
        String thumbnailImageUrl = StringUtils.join(ImageConstant.CAMPSITE_URL, postfix);

        campsite.setThumbnailImageUrl(thumbnailImageUrl);
        return imageMapper.toThumbnailResponseDto(baseUrl, campsiteRepository.save(campsite));
    }

    @Transactional
    public ImageDto.MapResponse uploadCampsiteMapImage(Long campsiteId, MultipartFile mapImage) {
        Campsite campsite = campsiteRepository.findById(campsiteId)
            .orElseThrow(() -> new NotFoundException(CampsiteExceptionCode.CAMPSITE_NOT_FOUND));
        if (!StringUtils.equals(campsite.getUser().getAccount(), securityHelper.getLoginAccount())) {
            throw new InvalidException(CommonExceptionCode.UNAUTHORIZED);
        }
        Path basePath = ImageConstant.CAMPSITE_DIR.resolve(campsite.getId().toString()).resolve(ImageConstant.MAP);
        String fileName = saveFile(basePath, mapImage);
        String postfix = String.join("/", campsite.getId().toString(), ImageConstant.MAP, fileName);
        String mapImageUrl = StringUtils.join(ImageConstant.CAMPSITE_URL, postfix);

        campsite.setMapImageUrl(mapImageUrl);
        return imageMapper.toMapResponseDto(baseUrl, campsiteRepository.save(campsite));
    }

    private String saveFile(Path dir, MultipartFile file) {
        try {
            Files.createDirectories(dir);
            FileUtils.cleanDirectory(new File(dir.toString()));

            String fileName = String.join("_", UUID.randomUUID().toString(), file.getOriginalFilename());
            Path dest = dir.resolve(fileName);
            file.transferTo(dest);

            return fileName;
        } catch (IOException e) {
            throw new InvalidException(ImageExceptionCode.IMAGE_FAIL_SAVE);
        }
    }

}
