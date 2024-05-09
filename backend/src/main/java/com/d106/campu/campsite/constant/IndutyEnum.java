package com.d106.campu.campsite.constant;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum IndutyEnum {

    카라반("카라반"),
    오토캠핑("자동차야영장"),
    캠핑("일반야영장"),
    글램핑("글램핑");

    private final String name;

    public String getName() {
        return this.name;
    }

}
