package com.d106.campu.common.constant;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum DoNmEnum {

    서울("서울시"),
    경기도("경기도"),
    인천("인천시"),
    대전("대전시"),
    대구("대구시"),
    부산("부산시"),
    울산("울산시"),
    광주("광주시"),
    세종("세종시"),
    강원도("강원도"),
    충청북도("충청북도"),
    충청남도("충청남도"),
    경상북도("경상북도"),
    경상남도("경상남도"),
    전라북도("전라북도"),
    전라남도("전라남도"),
    제주도("제주도");

    private final String name;

    public String getName() {
        return this.name;
    }

}
