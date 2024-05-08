package com.d106.campu.common.annotation;

import com.d106.campu.common.annotation.validator.ImageValidator;
import com.d106.campu.image.constant.ImageExtension;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER,
    ElementType.TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ImageValidator.class)
public @interface Image {

    String message();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    ImageExtension[] allowedExtensionList();

}
