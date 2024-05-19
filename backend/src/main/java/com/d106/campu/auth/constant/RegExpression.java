package com.d106.campu.auth.constant;

public class RegExpression {

    public static final String account = "^[a-zA-Z0-9]{6,12}$";
    public static final String nickname = "[가-힣a-zA-Z0-9]{2,8}$";
    public static final String tel = "^[0-9]{2,3}[0-9]{3,4}[0-9]{4}$";
    public static final String strongPassword = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=?\\{\\};':\"|,.<>/~`\\[\\]\\\\])[A-Za-z\\d!@#$%^&*()_+\\-=?\\{\\};':\"|,.<>/~`\\[\\]]{8,}$";
    public static final String time = "^((0[0-9])|(1[0-9])|(2[0-3])):([0-5][0-9])$";

}
