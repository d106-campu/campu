package com.d106.campu.campsite.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.core.convert.converter.Converter;

/**
 * @see <a href="https://javanitto.tistory.com/43">...</a>
 */
public class GetCampsiteListEnum {

    @AllArgsConstructor
    public enum QueryBy {
        INDUTY("induty"),
        THEME("theme");

        private String key;

        public static QueryBy of(String by) {
            if (by == null) {
                return null;
            }

            for (QueryBy b : QueryBy.values()) {
                if (b.key.equals(by.toLowerCase())) {
                    return b;
                }
            }
            /* TODO: 잘못된 입력 예외 던지기 */
            return null;
        }
    }

    @AllArgsConstructor
    @Getter
    public enum Induty {
        CARAVAN("caravan", "카라반"),
        AUTOCAMPING("autocamping", "자동차야영장"),
        CAMPING("camping", "일반야영장"),
        GLAMPING("glamping", "글램핑");

        private String key;
        private String value;

        public static Induty of(String induty) {
            if (induty == null) {
                return null;
            }

            for (Induty i : Induty.values()) {
                if (i.key.equals(induty.toLowerCase())) {
                    return i;
                }
            }
            return null;
        }
    }

    @AllArgsConstructor
    @Getter
    public enum Theme {
        SUMMER("summer", "여름물놀이"),
        TRAIL("trail", "걷기길"),
        ACTIVITY("activity", "액티비티"),
        SPRING("spring", "봄꽃여행"),
        AUTUMN("autumn", "가을단풍명소"),
        WINTER("winter", "겨울눈꽃명소"),
        SUNSET("sunset", "일몰명소"),
        SUNRISE("sunrise", "일출명소"),
        WATERSPORTS("watersports", "수상레저"),
        FISHING("fishing", "낚시"),
        AIRSPORTS("airsports", "항공레저"),
        SKIING("skiing", "스키");

        private String key;
        private String value;

        public static Theme of(String theme) {
            if (theme == null) {
                return null;
            }

            for (Theme t : Theme.values()) {
                if (t.key.equals(theme.toLowerCase())) {
                    return t;
                }
            }
            return null;
        }

    }

    public static class ByConverter implements Converter<String, QueryBy> {
        @Override
        public QueryBy convert(String source) {
            return QueryBy.of(source);
        }
    }

    public static class IndutyConverter implements Converter<String, Induty> {
        @Override
        public Induty convert(String source) {
            return Induty.of(source);
        }
    }
}
