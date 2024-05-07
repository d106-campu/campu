package com.d106.campu.mypage.constant;

public enum DateType {

    MONTH("MONTH"),
    MONTH6("MONTH6"),
    YEAR("YEAR"),
    TOTAL("TOTAL");

    private final String value;

    DateType(String value) {
        this.value = value;
    }

    public static DateType fromValue(String value) {
        for (DateType v : values()) {
            if (v.value.equals(value)) {
                return v;
            }
        }
        return null;
    }

}
