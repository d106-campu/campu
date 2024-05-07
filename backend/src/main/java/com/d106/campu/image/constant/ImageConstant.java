package com.d106.campu.image.constant;

import java.nio.file.Path;
import java.nio.file.Paths;

public class ImageConstant {

    /* image limit (10MB) */
    public static final int IMAGE_SIZE_LIMIT = 10485760;

    /* user */
    public static final String PROFILE_IMAGE = "profileImage";
    public static final Path USER_DIR = Paths.get(System.getProperty("user.dir"), "app", "files", "user")
        .toAbsolutePath().normalize();
    public static final String USER_URL = "/file/user/";

    /* campsite */
    public static final Path CAMPSITE_DIR = Paths.get(System.getProperty("user.dir"), "app", "files", "campsite")
        .toAbsolutePath().normalize();

}
