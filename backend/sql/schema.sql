DROP DATABASE IF EXISTS d106;
CREATE DATABASE d106;
USE d106;


-- d106.authority definition

CREATE TABLE `authority` (
  `authority_name` varchar(16) NOT NULL UNIQUE COMMENT '권한',
  PRIMARY KEY (`authority_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='권한';


-- d106.campsite_original definition

CREATE TABLE `campsite_original` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
  `content_id` varchar(128) DEFAULT NULL COMMENT '콘텐츠 아이디',
  `faclt_nm` varchar(128) DEFAULT NULL COMMENT '야영장명',
  `line_intro` varchar(512) DEFAULT NULL COMMENT '한줄소개',
  `intro` varchar(2048) DEFAULT NULL COMMENT '소개',
  `allar` int(11) DEFAULT NULL COMMENT '전체면적 (단위: ㎡)',
  `insrnc_at` char(1) DEFAULT NULL COMMENT '영업배상책임보험 가입여부 (Y: 사용, N: 미사용)',
  `trsagnt_no` varchar(32) DEFAULT NULL COMMENT '관광사업자번호',
  `bizrno` varchar(32) DEFAULT NULL COMMENT '사업자번호',
  `faclt_div_nm` varchar(16) DEFAULT NULL COMMENT '사업주체 구분',
  `mange_div_nm` varchar(16) DEFAULT NULL COMMENT '운영주체 (직영, 위탁)',
  `mgc_div` varchar(128) DEFAULT NULL COMMENT '운영기관',
  `manage_sttus` varchar(16) DEFAULT NULL COMMENT '운영상태',
  `hvof_bgnde` datetime DEFAULT NULL COMMENT '휴장기간 시작일',
  `hvof_enddle` datetime DEFAULT NULL COMMENT '휴장기간 종료일',
  `feature_nm` varchar(512) DEFAULT NULL COMMENT '특징',
  `induty` varchar(128) DEFAULT NULL COMMENT '업종',
  `lct_cl` varchar(128) DEFAULT NULL COMMENT '입지구분',
  `do_nm` varchar(32) DEFAULT NULL COMMENT '도',
  `sigungu_nm` varchar(64) DEFAULT NULL COMMENT '시군구',
  `zipcode` varchar(128) DEFAULT NULL COMMENT '우편번호',
  `addr1` varchar(512) DEFAULT NULL COMMENT '주소',
  `addr2` varchar(512) DEFAULT NULL COMMENT '주소상세',
  `map_x` double DEFAULT NULL COMMENT '경도 (X)',
  `map_y` double DEFAULT NULL COMMENT '위도 (Y)',
  `direction` varchar(1024) DEFAULT NULL COMMENT '오시는 길 컨텐츠',
  `tel` char(11) DEFAULT NULL COMMENT '전화',
  `homepage` varchar(1024) DEFAULT NULL COMMENT '홈페이지',
  `resve_url` varchar(1024) DEFAULT NULL COMMENT '예약 페이지',
  `resve_cl` varchar(64) DEFAULT NULL COMMENT '예약 구분',
  `manage_nmpr` int(11) DEFAULT NULL COMMENT '상주관리인원',
  `gnrl_site_co` int(11) DEFAULT NULL COMMENT '주요시설 일반야영장',
  `auto_site_co` int(11) DEFAULT NULL COMMENT '주요시설 자동차야영장',
  `glamp_site_co` int(11) DEFAULT NULL COMMENT '주요시설 글램핑',
  `carav_site_co` int(11) DEFAULT NULL COMMENT '주요시설 카라반',
  `indvdl_carav_site_co` int(11) DEFAULT NULL COMMENT '주요시설 개인 카라반',
  `sited_stnc` int(11) DEFAULT NULL COMMENT '사이트간 거리',
  `site_mg1_width` int(11) DEFAULT NULL COMMENT '사이트 크기1 가로 (단위: m)',
  `site_mg2_width` int(11) DEFAULT NULL COMMENT '사이트 크기2 가로 (단위: m)',
  `site_mg3_width` int(11) DEFAULT NULL COMMENT '사이트 크기3 가로 (단위: m)',
  `site_mg1_vrticl` int(11) DEFAULT NULL COMMENT '사이트 크기1 세로 (단위: m)',
  `site_mg2_vrticl` int(11) DEFAULT NULL COMMENT '사이트 크기2 세로 (단위: m)',
  `site_mg3_vrticl` int(11) DEFAULT NULL COMMENT '사이트 크기3 세로 (단위: m)',
  `site_mg1_co` int(11) DEFAULT NULL COMMENT '사이트 크기1 수량 (단위: 개)',
  `site_mg2_co` int(11) DEFAULT NULL COMMENT '사이트 크기2 수량 (단위: 개)',
  `site_mg3_co` int(11) DEFAULT NULL COMMENT '사이트 크기3 수량 (단위: 개)',
  `site_bottom_cl1` int(11) DEFAULT NULL COMMENT '잔디',
  `site_bottom_cl2` int(11) DEFAULT NULL COMMENT '파쇄석',
  `site_bottom_cl3` int(11) DEFAULT NULL COMMENT '테크',
  `site_bottom_cl4` int(11) DEFAULT NULL COMMENT '자갈',
  `site_bottom_cl5` int(11) DEFAULT NULL COMMENT '맨흙',
  `tooltip` varchar(1024) DEFAULT NULL COMMENT '툴팁',
  `glamp_inner_fclty` varchar(512) DEFAULT NULL COMMENT '글램핑 내부시설',
  `carav_inner_fclty` varchar(512) DEFAULT NULL COMMENT '카라반 내부시설',
  `prmisn_de` date DEFAULT NULL COMMENT '인허가일자',
  `oper_pd_cl` varchar(32) DEFAULT NULL COMMENT '운영기간',
  `oper_de_cl` varchar(32) DEFAULT NULL COMMENT '운영일',
  `trler_acmpny_at` char(1) DEFAULT NULL COMMENT '개인 트레일러 동반 여부 (Y: 사용, N: 미사용)',
  `carav_acmpny_at` char(1) DEFAULT NULL COMMENT '개인 카라반 동반 여부 (Y: 사용, N: 미사용)',
  `toilet_co` int(11) DEFAULT NULL COMMENT '화장실 개수 (단위: 개)',
  `swrm_co` int(11) DEFAULT NULL COMMENT '샤워실 개수 (단위: 개)',
  `wtrpl_co` int(11) DEFAULT NULL COMMENT '개수대 개수 (단위: 개)',
  `brazier_cl` varchar(16) DEFAULT NULL COMMENT '화로대',
  `sbrs_cl` varchar(256) DEFAULT NULL COMMENT '부대시설',
  `sbrs_etc` varchar(256) DEFAULT NULL COMMENT '부대시설 기타',
  `posbl_fclty_cl` varchar(256) DEFAULT NULL COMMENT '주변이용가능시설',
  `posbl_fclty_etc` varchar(256) DEFAULT NULL COMMENT '주변이용가능시설 기타',
  `cltur_event_at` char(1) DEFAULT NULL COMMENT '자체문화행사 여부 (Y: 사용, N: 미사용)',
  `cltur_event` varchar(128) DEFAULT NULL COMMENT '자체문화행사명',
  `exprn_progrm_at` char(1) DEFAULT NULL COMMENT '체험프로그램 여부 (Y: 사용, N: 미사용)',
  `exprn_progrm` varchar(128) DEFAULT NULL COMMENT '체험프로그램명',
  `extshr_co` int(11) DEFAULT NULL COMMENT '소화기 개수 (단위: 개)',
  `frprvt_wrpp_co` int(11) DEFAULT NULL COMMENT '방화수 개수 (단위: 개)',
  `frprvt_sand_co` int(11) DEFAULT NULL COMMENT '방화사 개수 (단위: 개)',
  `fire_sensor_co` int(11) DEFAULT NULL COMMENT '화재감지기 개수',
  `thema_envrn_cl` varchar(128) DEFAULT NULL COMMENT '테마환경',
  `eqpmn_lend_cl` varchar(128) DEFAULT NULL COMMENT '캠핑장비대여',
  `animal_cmg_cl` varchar(16) DEFAULT NULL COMMENT '애완동물출입',
  `tour_era_cl` varchar(32) DEFAULT NULL COMMENT '여행시기',
  `first_image_url` varchar(1024) DEFAULT NULL COMMENT '대표이미지',
  `createdtime` datetime DEFAULT NULL COMMENT '등록일',
  `modifiedtime` datetime DEFAULT NULL COMMENT '수정일',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='캠핑장 원본';


-- d106.fclty definition

CREATE TABLE `fclty` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
  `fclty` varchar(10) DEFAULT NULL COMMENT '부가시설 (화장실, 샤워실, 개수대, 와이파이, 매점, 카페, 바베큐, 반려동물, 놀이시설, 수영장, 계곡, 카라반진입)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='부가시설';


-- d106.induty definition

CREATE TABLE `induty` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
  `induty` varchar(10) DEFAULT NULL COMMENT '유형 (카라반, 자동차야영장, 일반야영장, 글램핑)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='유형';


-- d106.theme definition

CREATE TABLE `theme` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
  `theme` varchar(10) DEFAULT NULL COMMENT '테마 (여름물놀이, 걷기길, 액티비티, 봄꽃여행, 가을단풍명소, 겨울눈꽃명소, 일몰명소, 일출명소, 수상레저, 낚시, 항공레저, 스키)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='테마';


-- d106.`user` definition

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
  `account` varchar(16) NOT NULL UNIQUE COMMENT '아이디',
  `password` varchar(72) NOT NULL COMMENT '비밀번호',
  `nickname` varchar(8) NOT NULL UNIQUE COMMENT '닉네임',
  `gender` char(1) DEFAULT NULL COMMENT '성별',
  `birth_year` char(4) DEFAULT NULL COMMENT '출생년도',
  `profile_image_url` varchar(1024) DEFAULT NULL COMMENT '프로필 이미지 주소',
  `tel` char(11) NOT NULL UNIQUE COMMENT '전화번호',
  `delete_time` datetime DEFAULT NULL COMMENT '회원탈퇴 시간',
  `create_time` datetime DEFAULT current_timestamp() COMMENT '회원가입 시간',
  `update_time` datetime DEFAULT NULL COMMENT '정보수정 시간',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='회원';


-- d106.campsite definition

CREATE TABLE `campsite` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
  `user_id` bigint(20) NOT NULL COMMENT '회원 식별번호',
  `faclt_nm` varchar(128) DEFAULT NULL COMMENT '야영장명',
  `faclt_div_nm` varchar(16) DEFAULT NULL COMMENT '사업주체 구분',
  `tel` char(11) DEFAULT NULL COMMENT '전화',
  `line_intro` varchar(512) DEFAULT NULL COMMENT '한줄소개',
  `intro` varchar(2048) DEFAULT NULL COMMENT '소개',
  `allar` int(11) DEFAULT NULL COMMENT '전체면적 (단위: ㎡)',
  `bizrno` char(32) DEFAULT NULL COMMENT '사업자번호',
  `trsagnt_no` varchar(32) DEFAULT NULL COMMENT '관광사업자번호',
  `do_nm` varchar(32) DEFAULT NULL COMMENT '도',
  `sigungu_nm` varchar(64) DEFAULT NULL COMMENT '시군구',
  `addr1` varchar(512) DEFAULT NULL COMMENT '주소',
  `addr2` varchar(512) DEFAULT NULL COMMENT '주소상세',
  `induty_list` varchar(128) DEFAULT NULL COMMENT '유형 리스트',
  `thumbnail_image_url` varchar(1024) DEFAULT NULL COMMENT '대표 이미지 주소',
  `map_image_url` varchar(1024) DEFAULT NULL COMMENT '배치 이미지 주소',
  `homepage` varchar(1024) DEFAULT NULL COMMENT '홈페이지',
  `sited_stnc` int(11) DEFAULT NULL COMMENT '사이트간 거리',
  `animal_cmg_cl` varchar(16) DEFAULT NULL COMMENT '애완동물출입',
  `hit` bigint(20) DEFAULT 0 COMMENT '조회수',
  `create_time` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `update_time` datetime DEFAULT NULL COMMENT '수정 시간',
  PRIMARY KEY (`id`),
  KEY `campsite_user_FK` (`user_id`),
  CONSTRAINT `campsite_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='캠핑장';


-- d106.campsite_fclty definition

CREATE TABLE `campsite_fclty` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
  `campsite_id` bigint(20) NOT NULL COMMENT '캠핑장 식별번호',
  `fclty_id` bigint(20) NOT NULL COMMENT '부가시설',
  PRIMARY KEY (`id`),
  KEY `campsite_fclty_fclty_FK` (`fclty_id`),
  KEY `campsite_fclty_campsite_FK` (`campsite_id`),
  CONSTRAINT `campsite_fclty_campsite_FK` FOREIGN KEY (`campsite_id`) REFERENCES `campsite` (`id`),
  CONSTRAINT `campsite_fclty_fclty_FK` FOREIGN KEY (`fclty_id`) REFERENCES `fclty` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='캠핑장 부가시설';


-- d106.campsite_image definition

CREATE TABLE `campsite_image` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
  `campsite_id` bigint(20) NOT NULL COMMENT '캠핑장 식별번호',
  `url` varchar(1024) NOT NULL COMMENT '이미지 주소',
  PRIMARY KEY (`id`),
  KEY `campsite_image_campsite_FK` (`campsite_id`),
  CONSTRAINT `campsite_image_campsite_FK` FOREIGN KEY (`campsite_id`) REFERENCES `campsite` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='캠핑장 이미지';


-- d106.campsite_location definition

CREATE TABLE `campsite_location` (
  `campsite_id` bigint(20) NOT NULL,
  `map_x` double DEFAULT NULL COMMENT '경도',
  `map_y` double DEFAULT NULL COMMENT '위도',
  PRIMARY KEY (`campsite_id`),
  CONSTRAINT `campsite_location_campsite_FK` FOREIGN KEY (`campsite_id`) REFERENCES `campsite` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='캠핑장 위치';


-- d106.campsite_theme definition

CREATE TABLE `campsite_theme` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
  `campsite_id` bigint(20) NOT NULL COMMENT '캠핑장 식별번호',
  `theme_id` bigint(20) NOT NULL COMMENT '테마 고유번호',
  PRIMARY KEY (`id`),
  KEY `campsite_theme_campsite_FK` (`campsite_id`),
  KEY `campsite_theme_theme_FK` (`theme_id`),
  CONSTRAINT `campsite_theme_campsite_FK` FOREIGN KEY (`campsite_id`) REFERENCES `campsite` (`id`),
  CONSTRAINT `campsite_theme_theme_FK` FOREIGN KEY (`theme_id`) REFERENCES `theme` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='캠핑장 테마';

-- d106.campsite_theme definition

CREATE TABLE `campsite_like` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
    `campsite_id` bigint(20) NOT NULL COMMENT '캠핑장 식별번호',
    `user_id` bigint(20) NOT NULL COMMENT '회원 식별번호',
    PRIMARY KEY (`id`),
    KEY `campsite_like_campsite_FK` (`campsite_id`),
    KEY `campsite_like_user_FK` (`user_id`),
    CONSTRAINT `campsite_like_campsite_FK` FOREIGN KEY (`campsite_id`) REFERENCES `campsite` (`id`),
    CONSTRAINT `campsite_like_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='캠핑장 좋아요';

-- d106.room definition

CREATE TABLE `room` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
  `campsite_id` bigint(20) NOT NULL COMMENT '캠핑장 식별번호',
  `induty_id` bigint(20) NOT NULL COMMENT '유형 식별번호',
  `name` varchar(50) NOT NULL COMMENT '방 이름',
  `base_no` int(11) NOT NULL COMMENT '기본 인원',
  `max_no` int(11) NOT NULL COMMENT '최대 인원',
  `price` int(11) NOT NULL COMMENT '가격',
  `extra_price` int(11) DEFAULT NULL COMMENT '인당 추가가격',
  `room_cnt` int(11) NOT NULL COMMENT '방 개수',
  `toilet_cnt` int(11) NOT NULL DEFAULT 0 COMMENT '화장실 개수',
  `supply_list` varchar(512) DEFAULT NULL COMMENT '부대시설 목록',
  `create_time` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `update_time` datetime DEFAULT NULL COMMENT '수정 시간',
  PRIMARY KEY (`id`),
  KEY `room_campsite_FK` (`campsite_id`),
  KEY `room_induty_FK` (`induty_id`),
  CONSTRAINT `room_campsite_FK` FOREIGN KEY (`campsite_id`) REFERENCES `campsite` (`id`),
  CONSTRAINT `room_induty_FK` FOREIGN KEY (`induty_id`) REFERENCES `induty` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='캠핑장 방';


-- d106.room_image definition

CREATE TABLE `room_image` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
  `room_id` bigint(20) NOT NULL COMMENT '방 식별번호',
  `url` varchar(1024) NOT NULL COMMENT '이미지 주소',
  PRIMARY KEY (`id`),
  KEY `room_image_room_FK` (`room_id`),
  CONSTRAINT `room_image_room_FK` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='캠핑장 방 이미지';


-- d106.user_authority definition

CREATE TABLE `user_authority` (
  `user_id` bigint(20) NOT NULL COMMENT '회원 식별번호',
  `authority_name` varchar(16) NOT NULL COMMENT '권한 이름',
  PRIMARY KEY (`user_id`,`authority_name`),
  CONSTRAINT `user_authority_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_authority_authority_FK` FOREIGN KEY (`authority_name`) REFERENCES `authority` (`authority_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='회원 권한';


-- d106.reservation definition

CREATE TABLE `reservation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
  `user_id` bigint(20) NOT NULL COMMENT '회원 식별번호',
  `room_id` bigint(20) NOT NULL COMMENT '방 식별번호',
  `head_cnt` int(11) NOT NULL COMMENT '숙박 인원',
  `price` int(11) NOT NULL COMMENT '결제 금액',
  `start_date` date DEFAULT NULL COMMENT '숙박 시작날짜',
  `end_date` date DEFAULT NULL COMMENT '숙박 종료날짜',
  `create_time` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `update_time` datetime DEFAULT NULL COMMENT '수정 시간',
  PRIMARY KEY (`id`),
  KEY `reservation_room_FK` (`room_id`),
  KEY `reservation_user_FK` (`user_id`),
  CONSTRAINT `reservation_room_FK` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `reservation_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='캠핑장 예약';


-- d106.review definition

CREATE TABLE `review` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
  `campsite_id` bigint(20) NOT NULL COMMENT '캠핑장 식별번호',
  `reservation_id` bigint(20) NOT NULL COMMENT '예약 식별번호',
  `score` int(11) NOT NULL COMMENT '리뷰 점수',
  `content` varchar(200) NOT NULL COMMENT '리뷰 내용',
  PRIMARY KEY (`id`),
  KEY `review_campsite_FK` (`campsite_id`),
  KEY `review_reservation_FK` (`reservation_id`),
  CONSTRAINT `review_campsite_FK` FOREIGN KEY (`campsite_id`) REFERENCES `campsite` (`id`),
  CONSTRAINT `review_reservation_FK` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='캠핑장 리뷰';


-- d106.review_image definition

CREATE TABLE `review_image` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
  `review_id` bigint(20) NOT NULL COMMENT '리뷰 식별번호',
  `url` varchar(1024) NOT NULL COMMENT '이미지 주소',
  PRIMARY KEY (`id`),
  KEY `review_image_review_FK` (`review_id`),
  CONSTRAINT `review_image_review_FK` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='캠핑장 리뷰 이미지';
