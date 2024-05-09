package com.d106.campu.campsite.constant;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ThemeEnum {

    여름물놀이("여름물놀이"),
    걷기길("걷기길"),
    액티비티("액티비티"),
    봄꽃여행("봄꽃여행"),
    가을단풍명소("가을단풍명소"),
    겨울눈꽃명소("겨울눈꽃명소"),
    일몰명소("일몰명소"),
    일출명소("일출명소"),
    수상레저("수상레저"),
    낚시("낚시"),
    항공레저("항공레저"),
    스키("스키");

    private final String name;

    public String getName() {
        return this.name;
    }

}
