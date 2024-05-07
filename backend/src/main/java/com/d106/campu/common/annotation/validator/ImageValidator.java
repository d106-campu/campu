package com.d106.campu.common.annotation.validator;

import com.d106.campu.common.annotation.Image;
import com.d106.campu.image.constant.ImageConstant;
import com.d106.campu.image.constant.ImageExtension;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.io.IOException;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.tika.Tika;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author D102
 */
public class ImageValidator implements ConstraintValidator<Image, MultipartFile> {

    private Image annotation;

    @Override
    public void initialize(Image image) {
        annotation = image;
    }

    @Override
    public boolean isValid(MultipartFile profile, ConstraintValidatorContext context) {
        if (profile.isEmpty()) {
            context.buildConstraintViolationWithTemplate("Profile is empty").addConstraintViolation();
            return false;
        }

        final String name = profile.getOriginalFilename();
        if (StringUtils.isBlank(name)) {
            context.buildConstraintViolationWithTemplate("Profile name is empty").addConstraintViolation();
            return false;
        }

        try {
            int size = profile.getBytes().length;
            if (size == 0) {
                context.buildConstraintViolationWithTemplate("Profile size is empty").addConstraintViolation();
                return false;
            }

            /* 10MB */
            if (size > ImageConstant.PROFILE_SIZE_LIMIT) {
                context.buildConstraintViolationWithTemplate("Profile size is too large").addConstraintViolation();
                return false;
            }
        } catch (IOException e) {
            context.buildConstraintViolationWithTemplate("Error while reading profile").addConstraintViolation();
            return false;
        }

        final String extension = FilenameUtils.getExtension(name);
        final ImageExtension[] allowedExtensionList = annotation.allowedExtensionList();
        boolean isValidExtension = false;
        for (ImageExtension allowedExtension : allowedExtensionList) {
            if (StringUtils.equals(allowedExtension.getImageExtensionLowerCase(), extension.toLowerCase())) {
                isValidExtension = true;
                break;
            }
        }
        if (!isValidExtension) {
            context.buildConstraintViolationWithTemplate("Invalid profile extension").addConstraintViolation();
            return false;
        }

        final String detectedMimeType = getMimeTypeByTika(profile);
        boolean isValidMimeType = false;
        for (ImageExtension allowedExtension : allowedExtensionList) {
            if (ArrayUtils.contains(allowedExtension.getImageMimeTypeList(), detectedMimeType)) {
                isValidMimeType = true;
                break;
            }
        }
        if (!isValidMimeType) {
            context.buildConstraintViolationWithTemplate("Modified profile extension").addConstraintViolation();
            return false;
        }

        return true;
    }

    /**
     * Get mime type by Tika
     *
     * @param profile
     * @return
     */
    private String getMimeTypeByTika(MultipartFile profile) {
        try {
            return new Tika().detect(profile.getInputStream());
        } catch (IOException e) {
            return null;
        }
    }

}
