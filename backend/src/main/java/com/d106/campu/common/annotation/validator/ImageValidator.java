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
 * @author D106
 */
public class ImageValidator implements ConstraintValidator<Image, MultipartFile> {

    private Image annotation;

    @Override
    public void initialize(Image image) {
        annotation = image;
    }

    @Override
    public boolean isValid(MultipartFile image, ConstraintValidatorContext context) {
        if (image.isEmpty()) {
            context.buildConstraintViolationWithTemplate("image is empty").addConstraintViolation();
            return false;
        }

        final String name = image.getOriginalFilename();
        if (StringUtils.isBlank(name)) {
            context.buildConstraintViolationWithTemplate("image name is empty").addConstraintViolation();
            return false;
        }

        try {
            int size = image.getBytes().length;
            if (size == 0) {
                context.buildConstraintViolationWithTemplate("image size is empty").addConstraintViolation();
                return false;
            }

            /* 10MB */
            if (size > ImageConstant.IMAGE_SIZE_LIMIT) {
                context.buildConstraintViolationWithTemplate("image size is too large").addConstraintViolation();
                return false;
            }
        } catch (IOException e) {
            context.buildConstraintViolationWithTemplate("Error while reading image").addConstraintViolation();
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
            context.buildConstraintViolationWithTemplate("Invalid image extension").addConstraintViolation();
            return false;
        }

        final String detectedMimeType = getMimeTypeByTika(image);
        boolean isValidMimeType = false;
        for (ImageExtension allowedExtension : allowedExtensionList) {
            if (ArrayUtils.contains(allowedExtension.getImageMimeTypeList(), detectedMimeType)) {
                isValidMimeType = true;
                break;
            }
        }
        if (!isValidMimeType) {
            context.buildConstraintViolationWithTemplate("Modified image extension").addConstraintViolation();
            return false;
        }

        return true;
    }

    /**
     * Get mime type by Tika
     *
     * @param image
     * @return
     */
    private String getMimeTypeByTika(MultipartFile image) {
        try {
            return new Tika().detect(image.getInputStream());
        } catch (IOException e) {
            return null;
        }
    }

}
