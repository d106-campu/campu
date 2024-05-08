package com.d106.campu.auth.constant;

public class AuthConstant {

    public static final String AVAILABLE = "available";
    public static final String VERIFY = "verify";
    public static final String USER = "user";
    public static final int TEL_HASH_LIFE_SEC = 180;
    public static final int TEL_VERIFY_HASH_LIFE_SEC = 3600;
    public static final int TEL_SEND_LIMIT = 3;
    public static final String TEL_AUTH_SEND_MESSAGE = "[campu] 인증번호\n ";
    public static final int SECOND_TO_MILLISECOND = 1000;
    public static final String AUTHORITIES_KEY = "auth";
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String AUTHORIZATION_PREFIX = "Bearer ";
    public static final int TOKEN_BEGIN_IDX = 7;

}
