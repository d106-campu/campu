package com.d106.campu.image.service;

import com.d106.campu.campsite.constant.CampsiteConstant;
import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.domain.jpa.CampsiteImage;
import com.d106.campu.campsite.exception.code.CampsiteExceptionCode;
import com.d106.campu.campsite.repository.jpa.CampsiteImageRepository;
import com.d106.campu.campsite.repository.jpa.CampsiteRepository;
import com.d106.campu.common.exception.InvalidException;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.exception.code.CommonExceptionCode;
import com.d106.campu.common.util.SecurityHelper;
import com.d106.campu.image.constant.ImageConstant;
import com.d106.campu.image.dto.ImageDto;
import com.d106.campu.image.exception.code.ImageExceptionCode;
import com.d106.campu.image.mapper.ImageMapper;
import com.d106.campu.image.repository.ImageRepository;
import com.d106.campu.review.domain.jpa.Review;
import com.d106.campu.review.repository.jpa.ReviewRepository;
import com.d106.campu.room.domain.jpa.Room;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.exception.code.UserExceptionCode;
import com.d106.campu.user.repository.jpa.UserRepository;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Slf4j
@Service
public class ImageService {

    @Value("${app.base-url}")
    private String baseUrl;

    private final UserRepository userRepository;
    private final CampsiteRepository campsiteRepository;
    private final CampsiteImageRepository campsiteImageRepository;
    private final ImageRepository imageRepository;
    private final ReviewRepository reviewRepository;
    private final ImageMapper imageMapper;
    private final SecurityHelper securityHelper;

    @Transactional
    public String uploadUserProfileImage(MultipartFile profileImage) {
        User user = userRepository.findByAccount(securityHelper.getLoginAccount())
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));

        Path basePath = ImageConstant.USER_DIR.resolve(user.getId().toString()).resolve(ImageConstant.PROFILE);
        createAndCleanDirectory(basePath);
        String fileName = saveFile(basePath, profileImage);
        String postfix = String.join("/", user.getId().toString(), ImageConstant.PROFILE, fileName);
        String profileImageUrl = StringUtils.join(baseUrl, ImageConstant.USER_URL, postfix);
        user.setProfileImageUrl(profileImageUrl);

        return userRepository.save(user).getProfileImageUrl();
    }

    @Transactional
    public String uploadCampsiteThumbnailImage(Long campsiteId, MultipartFile thumbnailImage) {
        Campsite campsite = campsiteRepository.findById(campsiteId)
            .orElseThrow(() -> new NotFoundException(CampsiteExceptionCode.CAMPSITE_NOT_FOUND));
        if (!StringUtils.equals(campsite.getUser().getAccount(), securityHelper.getLoginAccount())) {
            throw new InvalidException(CommonExceptionCode.UNAUTHORIZED);
        }

        Path basePath = ImageConstant.CAMPSITE_DIR.resolve(campsite.getId().toString()).resolve(ImageConstant.THUMBNAIL);
        createAndCleanDirectory(basePath);
        String fileName = saveFile(basePath, thumbnailImage);
        String postfix = String.join("/", campsite.getId().toString(), ImageConstant.THUMBNAIL, fileName);
        String thumbnailImageUrl = StringUtils.join(baseUrl, ImageConstant.CAMPSITE_URL, postfix);
        campsite.setThumbnailImageUrl(thumbnailImageUrl);

        return campsiteRepository.save(campsite).getThumbnailImageUrl();
    }

    @Transactional
    public String uploadCampsiteMapImage(Long campsiteId, MultipartFile mapImage) {
        Campsite campsite = campsiteRepository.findById(campsiteId)
            .orElseThrow(() -> new NotFoundException(CampsiteExceptionCode.CAMPSITE_NOT_FOUND));
        if (!StringUtils.equals(campsite.getUser().getAccount(), securityHelper.getLoginAccount())) {
            throw new InvalidException(CommonExceptionCode.UNAUTHORIZED);
        }

        Path basePath = ImageConstant.CAMPSITE_DIR.resolve(campsite.getId().toString()).resolve(ImageConstant.MAP);
        createAndCleanDirectory(basePath);
        String fileName = saveFile(basePath, mapImage);
        String postfix = String.join("/", campsite.getId().toString(), ImageConstant.MAP, fileName);
        String mapImageUrl = StringUtils.join(baseUrl, ImageConstant.CAMPSITE_URL, postfix);
        campsite.setMapImageUrl(mapImageUrl);

        return campsiteRepository.save(campsite).getMapImageUrl();
    }

    @Transactional
    public List<ImageDto.UploadListResponse> uploadCampsiteGeneralImageList(Long campsiteId,
        List<MultipartFile> generalImageList) {
        Campsite campsite = campsiteRepository.findById(campsiteId)
            .orElseThrow(() -> new NotFoundException(CampsiteExceptionCode.CAMPSITE_NOT_FOUND));
        // TODO: existsBy... 메서드를 사용하도록 수정
        if (!StringUtils.equals(campsite.getUser().getAccount(), securityHelper.getLoginAccount())) {
            throw new InvalidException(CommonExceptionCode.UNAUTHORIZED);
        }

        imageRepository.deleteAllByCampsite_Id(campsite.getId());

        Path basePath = ImageConstant.CAMPSITE_DIR.resolve(campsite.getId().toString()).resolve(ImageConstant.GENERAL);
        createAndCleanDirectory(basePath);
        generalImageList.stream()
            .map(file -> saveFile(basePath, file))
            .map(fileName -> String.join("/", campsite.getId().toString(), ImageConstant.GENERAL, fileName))
            .map(postfix -> StringUtils.join(baseUrl, ImageConstant.CAMPSITE_URL, postfix))
            .map(imageMapper::toCampsiteImage)
            .forEach(campsite::addCampsiteImage);

        return campsiteRepository.save(campsite).getCampsiteImageList().stream()
            .map(imageMapper::toUploadListResponse).toList();
    }

    @Transactional
    public List<ImageDto.UploadListResponse> updateCampsiteGeneralImageList(Long campsiteId,
        ImageDto.UploadListRequest uploadListRequest, List<MultipartFile> generalImageList) {
        Campsite campsite = campsiteRepository.findById(campsiteId)
            .orElseThrow(() -> new NotFoundException(CampsiteExceptionCode.CAMPSITE_NOT_FOUND));
        if (!StringUtils.equals(campsite.getUser().getAccount(), securityHelper.getLoginAccount())) {
            throw new InvalidException(CommonExceptionCode.UNAUTHORIZED);
        }

        if (!uploadListRequest.getImageIdList().isEmpty()) {
            List<CampsiteImage> deleteImageList = campsiteImageRepository.findAllById(uploadListRequest.getImageIdList());
            imageRepository.deleteAllByIdIn(uploadListRequest.getImageIdList());
            deleteCampsiteImage(deleteImageList);
        }

        Path basePath = ImageConstant.CAMPSITE_DIR.resolve(campsite.getId().toString()).resolve(ImageConstant.GENERAL);
        generalImageList.stream()
            .map(file -> saveFile(basePath, file))
            .map(fileName -> String.join("/", campsite.getId().toString(), ImageConstant.GENERAL, fileName))
            .map(postfix -> StringUtils.join(baseUrl, ImageConstant.CAMPSITE_URL, postfix))
            .map(imageMapper::toCampsiteImage)
            .forEach(campsite::addCampsiteImage);

        return campsiteRepository.save(campsite).getCampsiteImageList().stream()
            .map(imageMapper::toUploadListResponse).toList();
    }

    @Transactional
    public void deleteAll(Long campsiteId) {
        Campsite campsite = campsiteRepository.findById(campsiteId)
            .orElseThrow(() -> new NotFoundException(CampsiteExceptionCode.CAMPSITE_NOT_FOUND));
        if (!StringUtils.equals(campsite.getUser().getAccount(), securityHelper.getLoginAccount())) {
            throw new InvalidException(CommonExceptionCode.UNAUTHORIZED);
        }

        imageRepository.deleteAllByCampsite_Id(campsite.getId());
    }

    @Transactional
    public void deleteProfileImage() {
        User user = userRepository.findByAccount(securityHelper.getLoginAccount())
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
        user.setProfileImageUrl(null);
    }

    @Transactional
    public void deleteThumbnailImage(Long campsiteId) {
        Campsite campsite = campsiteRepository.findById(campsiteId)
            .orElseThrow(() -> new NotFoundException(CampsiteExceptionCode.CAMPSITE_NOT_FOUND));
        if (!StringUtils.equals(campsite.getUser().getAccount(), securityHelper.getLoginAccount())) {
            throw new InvalidException(CommonExceptionCode.UNAUTHORIZED);
        }

        campsite.setThumbnailImageUrl(null);
    }

    private void deleteCampsiteImage(List<CampsiteImage> deleteImageList) {
        String keyword = CampsiteConstant.CAMPSITE;
        for (CampsiteImage campsiteImage : deleteImageList) {
            String url = campsiteImage.getUrl();
            int startIndex = url.indexOf(keyword) + keyword.length() + 1;
            String result = url.substring(startIndex);
            Path deletePath = ImageConstant.CAMPSITE_DIR.resolve(result);
            try {
                Files.delete(deletePath);
            } catch (IOException e) {
                throw new InvalidException(CommonExceptionCode.INVALID_PARAM);
            }
        }
    }

    @Transactional
    public void uploadReviewImageList(Review review, List<MultipartFile> reviewImageList) {
        Path basePath = ImageConstant.CAMPSITE_DIR.resolve(review.getCampsite().getId().toString())
            .resolve(ImageConstant.REVIEW).resolve(review.getReservation().getId().toString());
        createAndCleanDirectory(basePath);

        review.setReviewImageList(new ArrayList<>());

        reviewImageList.stream()
            .map(file -> saveFile(basePath, file))
            .map(fileName -> String.join("/", review.getCampsite().getId().toString(), ImageConstant.REVIEW,
                review.getReservation().getId().toString(), fileName))
            .map(postfix -> StringUtils.join(baseUrl, ImageConstant.CAMPSITE_URL, postfix))
            .map(imageMapper::toReviewImage)
            .forEach(review::addReviewImage);

        reviewRepository.save(review);
    }

    @Transactional
    public void uploadRoomImage(Room room, MultipartFile roomImage) {
        Path basePath = ImageConstant.CAMPSITE_DIR.resolve(room.getCampsite().getId().toString()).resolve(ImageConstant.ROOM)
            .resolve(room.getId().toString());
        createAndCleanDirectory(basePath);
        String fileName = saveFile(basePath, roomImage);
        String postfix = String.join("/", room.getCampsite().getId().toString(), ImageConstant.ROOM, room.getId().toString(),
            fileName);
        String proRoomImageUrl = StringUtils.join(baseUrl, ImageConstant.CAMPSITE_URL, postfix);
        room.setImageUrl(proRoomImageUrl);
    }

    private String saveFile(Path dir, MultipartFile file) {
        String fileName = String.join("_", UUID.randomUUID().toString(), file.getOriginalFilename());
        Path dest = dir.resolve(fileName);
        try {
            file.transferTo(dest);
        } catch (IOException e) {
            throw new InvalidException(ImageExceptionCode.IMAGE_SAVE_FAIL);
        }
        return fileName;
    }

    private void createAndCleanDirectory(Path dir) {
        try {
            Files.createDirectories(dir);
            FileUtils.cleanDirectory(new File(dir.toString()));
        } catch (IOException e) {
            throw new InvalidException(ImageExceptionCode.DIR_CREATE_FAIL);
        }
    }

}
