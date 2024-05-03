USE d106;

-- ----------------------------------------
--
-- user
--
-- ----------------------------------------

INSERT INTO `user` (`account`, `password`, `nickname`, `gender`, `birth_year`, `profile_image_url`, `tel`)
VALUES ('cheesecat47', '1234', 'refo', 'M', '1995', 'https://avatars.githubusercontent.com/u/41780495', '01012312312'),
       ('manager', 'campu1!', 'manager', 'F', '2000', null, '01023123123');

SET @user_cheesecat47 = (SELECT id FROM `user` WHERE account = 'cheesecat47');
SET @user_manager = (SELECT id FROM `user` WHERE account = 'manager');

-- ----------------------------------------
--
-- authority
--
-- ----------------------------------------

INSERT INTO `authority` (`authority_name`)
VALUES ('MANAGER'),
       ('USER');

INSERT INTO `user_authority` (`user_id`, `authority_name`)
VALUES (@user_cheesecat47, 'USER'),
       (@user_manager, 'MANAGER');

-- ----------------------------------------
--
-- campsite
--
-- ----------------------------------------

INSERT INTO `campsite` (`user_id`, `faclt_nm`, `faclt_div_nm`, `tel`, `line_intro`, `intro`, `allar`, `bizrno`, `trsagnt_no`, `do_nm`, `sigungu_nm`, `addr1`, `addr2`, `induty_list`, `thumbnail_image_url`, `map_image_url`, `homepage`, `sited_stnc`, `animal_cmg_cl`, `hit`)
VALUES (@user_manager, '캠프유캠푸 캠핑장', '민간', '01012312312', '이국적인 캐러밴과 알찬 부대시설', '강원도 춘천시 남면에 자리했다. 서울양양고속도로 강촌IC에서 엘리시안강촌 방면으로 30분가량 달리면 도착한다. 이곳은 북한강 변의 수려한 풍광을 배경으로 캐러밴 40대가 들어찼다. 고급스러움이 돋보이는 유럽피안 캐러밴과 에어스트림 캐러밴이다. 모든 캐러밴은 각기 다른 주제로 꾸몄다. 이 덕분에 욕실에 중점을 둔 객실이나 침실에 초점을 맞춘 객실 등 취향에 따라 선택하는 재미가 있다. 외부에는 어닝 아래 테이블, 의자, 노천욕탕, 바비큐 시설을 마련했다. 캠핑장의 강점 중 하나는 부대시설이다. 카페, 수영장, 찜질방, 스파, 중앙 무대, 분수, 노래방 등 고급스러움으로 치장한 시설이 차고 넘친다.',
6600,  '2017-6', '169-52-00647', '강원도', 'cnscjstl', '강원도 춘천시 남면 가옹개길 52-9', null, '카라반', 'https://gocamping.or.kr/upload/camp/10/thumb/thumb_720_1869epdMHtUyrinZWKFHDWty.jpg', null, null, 10, '불가능', 10);

SET @campsite_1 = (SELECT id FROM `campsite` WHERE faclt_nm = '캠프유캠푸 캠핑장');

INSERT INTO `campsite_location` (`campsite_id`, `map_x`, `map_y`)
VALUES (@campsite_1,'36.107901','128.417657');

-- ----------------------------------------
--
-- induty
--
-- ----------------------------------------

INSERT INTO `induty` (`induty`)
VALUES ('카라반'),
       ('자동차야영장'),
       ('일반야영장'),
       ('글램핑');

SET @induty_caravan = (SELECT id FROM `induty` WHERE induty = '카라반');

-- ----------------------------------------
--
-- room
--
-- ----------------------------------------

INSERT INTO `room` (`campsite_id`, `induty_id`, `name`, `base_no`, `max_no`, `price`, `extra_price`, `room_cnt`, `toilet_cnt`, `supply_list`)
VALUES (@campsite_1, @induty_caravan, 'A구역 (벚꽃 캠핑존)', 2, 4, 150000, 50000, 1, 1, null);

SET @room_A = (SELECT id FROM `room` WHERE name = 'A구역 (벚꽃 캠핑존)');

-- ----------------------------------------
--
-- reservation
--
-- ----------------------------------------

INSERT INTO `reservation` (`user_id`, `room_id`, `head_cnt`, `price`, `start_date`, `end_date`)
VALUES (@user_cheesecat47, @room_A, 3, 200000, '2024-05-10', '2024-05-14');
