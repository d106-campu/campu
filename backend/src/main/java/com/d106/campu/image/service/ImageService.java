package com.d106.campu.image.service;

import com.d106.campu.common.exception.InvalidException;
import com.d106.campu.common.exception.NotFoundException;
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
import java.util.StringJoiner;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class ImageService {

    private final UserRepository userRepository;
    private final ImageMapper imageMapper;
    private final SecurityHelper securityHelper;

    @Transactional
    public ImageDto.ProfileResponse uploadProfileImage(MultipartFile profileImage) {
        User user = userRepository.findByAccount(securityHelper.getLoginAccount())
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
        Path basePath = ImageConstant.USER_DIR.resolve(user.getId().toString());
        String fileName = saveFile(basePath, profileImage);
        String profileImageUrl = StringUtils.join(ImageConstant.USER_URL, user.getId(), "/", fileName);

        user.setProfileImageUrl(profileImageUrl);
        return imageMapper.toProfileResponseDto(userRepository.saveAndFlush(user));
    }

    private String saveFile(Path dir, MultipartFile file) {
        try {
            Files.createDirectories(dir);
            FileUtils.cleanDirectory(new File(dir.toString()));

            String fileName = new StringJoiner("_")
                .add(UUID.randomUUID().toString())
                .add(file.getOriginalFilename())
                .toString();
            Path dest = dir.resolve(fileName);
            file.transferTo(dest);

            return fileName;
        } catch (IOException e) {
            throw new InvalidException(ImageExceptionCode.IMAGE_FAIL_SAVE);
        }
    }

}
