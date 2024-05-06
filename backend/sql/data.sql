USE d106;

-- ----------------------------------------
--
-- user
--
-- ----------------------------------------

INSERT INTO `user` (`role`, `account`, `password`, `nickname`, `gender`, `birth_year`, `profile_image_url`, `tel`)
VALUES ('ADMIN', 'hoing97s', '1234', 'hoing97s', 'M', '2000', 'https://avatars.githubusercontent.com/u/140311409', '01012312312'),
       ('USER', 'danbeeS2', '1234', 'danbeeS2', 'F', '2000', 'https://avatars.githubusercontent.com/u/120550679', '01012312314'),
       ('USER', 'cheesecat47', '1234', 'refo', 'M', '2000', 'https://avatars.githubusercontent.com/u/41780495', '01012312315'),
       ('USER', 'Agwii', '1234', 'Agwii', 'M', '2000', 'https://avatars.githubusercontent.com/u/139833245', '01012312316'),
       ('USER', 'minnnnnk0', '1234', 'minnnnnk', 'F', '2000', 'https://avatars.githubusercontent.com/u/139419164', '01012312317'),
       ('USER', 'choihojo', '1234', 'choihojo', 'M', '2000', 'https://avatars.githubusercontent.com/u/87483951?', '01012312318'),
       ('OWNER', 'sajangnim', 'campu1!', 'sajang1', 'F', '2000', null, '01023123123');

SET @user_hoing97s = (SELECT id FROM `user` WHERE account = 'hoing97s');
SET @user_danbeeS2 = (SELECT id FROM `user` WHERE account = 'danbeeS2');
SET @user_cheesecat47 = (SELECT id FROM `user` WHERE account = 'cheesecat47');
SET @user_Agwii = (SELECT id FROM `user` WHERE account = 'Agwii');
SET @user_minnnnnk0 = (SELECT id FROM `user` WHERE account = 'minnnnnk0');
SET @user_choihojo = (SELECT id FROM `user` WHERE account = 'choihojo');
SET @user_manager = (SELECT id FROM `user` WHERE account = 'sajangnim');

-- ----------------------------------------
--
-- campsite
--
-- ----------------------------------------

INSERT INTO `campsite` (`user_id`, `faclt_nm`, `faclt_div_nm`, `tel`, `line_intro`, `intro`, `allar`, `bizrno`, `trsagnt_no`, `do_nm`, `sigungu_nm`, `addr1`, `addr2`, `induty_list`, `thumbnail_image_url`, `map_image_url`, `homepage`, `sited_stnc`, `animal_cmg_cl`, `hit`)
VALUES (@user_manager, '캠프유캠푸 캠핑장', '민간', '01012312312', '이국적인 캐러밴과 알찬 부대시설', '강원도 춘천시 남면에 자리했다. 서울양양고속도로 강촌IC에서 엘리시안강촌 방면으로 30분가량 달리면 도착한다. 이곳은 북한강 변의 수려한 풍광을 배경으로 캐러밴 40대가 들어찼다. 고급스러움이 돋보이는 유럽피안 캐러밴과 에어스트림 캐러밴이다. 모든 캐러밴은 각기 다른 주제로 꾸몄다. 이 덕분에 욕실에 중점을 둔 객실이나 침실에 초점을 맞춘 객실 등 취향에 따라 선택하는 재미가 있다. 외부에는 어닝 아래 테이블, 의자, 노천욕탕, 바비큐 시설을 마련했다. 캠핑장의 강점 중 하나는 부대시설이다. 카페, 수영장, 찜질방, 스파, 중앙 무대, 분수, 노래방 등 고급스러움으로 치장한 시설이 차고 넘친다.', 6600, '169-52-00647', '2017-6', '강원도', '춘천시', '강원도 춘천시 남면 가옹개길 52-9', null, '카라반', 'https://gocamping.or.kr/upload/camp/10/thumb/thumb_720_1869epdMHtUyrinZWKFHDWty.jpg', null, null, 10, '불가능', 10),
       (@user_manager, '호반캠핑장', '민간', '033263330', NULL, NULL, 4000, '802-23-00574', '2017-00005', '강원도', '춘천시', '강원도 춘천시 신동 970-1번지', NULL, '자동차야영장,카라반,글램핑', 'https://gocamping.or.kr/upload/camp/3511/thumb/thumb_720_2711bF0RySFuTljb4HgPRx3m.jpg', null, 'http://hobancamping.com', 0, '불가능', 2),
       (@user_manager, '라이프위드도그', '지자체', '033461337', '반려견 산책로,수영장,체육관을 갖춘 반려동물 친화 캠핑장', '인제군 자작나무 숲을 끼고 있는 2만여 평의 넓은 부지를 갖춘 리조트&캠핑장으로 반려 가족 전용 시설로, 직원 모두 반려동물 관련 자격증을 가지고 있다. 총 30개의 객실이 있는 리조트와 38개의 캠핑장이 구비되어 있으며, 차박 및 카라반, 캠핑카도 요금을 추가하면 이용할 수 있다. 우천 시 또는 겨울 시즌에 이용할 수 있는 실내 체육관에서는 어질리티 대회 등 각종 행사가 진행되기도 한다. 부대시설로는 식당과 반려견 호텔 및 카페, 스토어가 있으며 반려 가족 전용시설답게 반려견 의무실도 갖추고 있다.', 1874, '635-87-02125', NULL, '강원도', '인제군', '강원 인제군 인제읍 자작나무숲길 1112', NULL, '일반야영장', 'https://gocamping.or.kr/upload/camp/100183/thumb/thumb_720_5468clszlFwrSDn7oSCJO7uX.jpg', null, 'www.lifewithdog.co.kr', 0, '가능', 1),
       (@user_manager, '림스 글램핑', '민간', '033263330', '강진 림스정원 내에 위치한 글램핑, 야영장입니다.', '예쁜 정원과 함께하는 글램핑 정원과 함께 힐링할 수 있는 림스 글램핑은 전라남도에서 주최한 예쁜 정원 콘테스트에서 최우수상을 수상한 림스가든 안에 자리하고 있어 동화 속 같은 아름다운 정원에서 감성 글램핑을 즐길 수 있다. 아늑한 글램핑 내부 인테리어와 아이들이 신나게 물놀이할 수 있는 수영장과 트램펄린, 산책 코스까지 완벽한 편의 시설을 자랑한다. 또한 모든 객실은 세스코 관리를 받고 있어 더욱 믿을만하다. 반려견, 숯, 장작 등 개인 화기 및 반려견 동반은 불가하며 근처에 월출산과 가우도는 함께 둘러보기 좋은 관광 명소이다.', 6600, '853-60-00338', '2021-1', '전라남도', '강진군', '전남 강진군 강진읍 해강로 1038-30', NULL, '일반야영장,카라반,글램핑', 'https://gocamping.or.kr/upload/camp/100008/thumb/thumb_720_6107z9OQLZWk9dvIhx8OblHM.jpg', null, 'http://limsglamping.modoo.at', 0, '불가능', 2);

SET @campsite_1 = (SELECT id FROM `campsite` WHERE faclt_nm = '캠프유캠푸 캠핑장');
SET @campsite_2 = (SELECT id FROM `campsite` WHERE faclt_nm = '호반캠핑장');
SET @campsite_3 = (SELECT id FROM `campsite` WHERE faclt_nm = '라이프위드도그');
SET @campsite_4 = (SELECT id FROM `campsite` WHERE faclt_nm = '림스 글램핑');

INSERT INTO `campsite_location` (`campsite_id`, `map_x`, `map_y`)
VALUES (@campsite_1, 128.417657, 36.107901),
       (@campsite_2, 127.7178084, 37.9339721),
       (@campsite_3, 128.2316879, 38.00156),
       (@campsite_4, 126.7367324, 34.6030215);

INSERT INTO `campsite_like` (`campsite_id`, `user_id`)
VALUES (@campsite_1, @user_cheesecat47),
       (@campsite_3, @user_cheesecat47),
       (@campsite_1, @user_hoing97s),
       (@campsite_2, @user_hoing97s),
       (@campsite_3, @user_manager);

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
SET @induty_autocamping = (SELECT id FROM `induty` WHERE induty = '자동차야영장');
SET @induty_camping = (SELECT id FROM `induty` WHERE induty = '일반야영장');
SET @induty_glamping = (SELECT id FROM `induty` WHERE induty = '글램핑');

-- ----------------------------------------
--
-- theme
--
-- ----------------------------------------

INSERT INTO `theme` (`theme`)
VALUES ('여름물놀이'),
       ('걷기길'),
       ('액티비티'),
       ('봄꽃여행'),
       ('가을단풍명소'),
       ('겨울눈꽃명소'),
       ('일몰명소'),
       ('일출명소'),
       ('수상레저'),
       ('낚시'),
       ('항공레저'),
       ('스키');

SET @theme_summer = (SELECT id FROM `theme` WHERE theme = '여름물놀이');
SET @theme_trail = (SELECT id FROM `theme` WHERE theme = '걷기길');
SET @theme_activity = (SELECT id FROM `theme` WHERE theme = '액티비티');
SET @theme_autumn = (SELECT id FROM `theme` WHERE theme = '가을단풍명소');

INSERT INTO `campsite_theme` (`campsite_id`, `theme_id`)
VALUES (@campsite_1, @theme_summer),
       (@campsite_1, @theme_trail),
       (@campsite_1, @theme_autumn),
       (@campsite_2, @theme_summer),
       (@campsite_2, @theme_activity),
       (@campsite_3, @theme_trail),
       (@campsite_3, @theme_autumn),
       (@campsite_4, @theme_summer),
       (@campsite_4, @theme_autumn);

-- ----------------------------------------
--
-- room
--
-- ----------------------------------------

INSERT INTO `room` (`campsite_id`, `induty_id`, `name`, `base_no`, `max_no`, `price`, `extra_price`, `room_cnt`, `toilet_cnt`, `supply_list`)
VALUES (@campsite_1, @induty_caravan, 'A구역 (벚꽃 캠핑존)', 2, 4, 150000, 50000, 1, 1, null),
       (@campsite_2, @induty_autocamping, '자동차1', 4, 4, 100000, 0, 1, 1, null),
       (@campsite_2, @induty_caravan, '카라반1', 2, 3, 200000, 50000, 1, 1, null),
       (@campsite_2, @induty_glamping, '글램핑A', 4, 6, 300000, 80000, 3, 2, null),
       (@campsite_3, @induty_camping, '평상1', 4, 4, 100000, 0, 1, 1, null),
       (@campsite_4, @induty_caravan, '카라반1', 2, 3, 200000, 50000, 1, 1, null),
       (@campsite_4, @induty_glamping, '글램핑A', 4, 6, 300000, 80000, 3, 2, null);

SET @room_1 = (SELECT id FROM `room` WHERE campsite_id = @campsite_1 AND name = 'A구역 (벚꽃 캠핑존)');
SET @room_2 = (SELECT id FROM `room` WHERE campsite_id = @campsite_2 AND name = '자동차1');
SET @room_3 = (SELECT id FROM `room` WHERE campsite_id = @campsite_4 AND name = '카라반1');

-- ----------------------------------------
--
-- reservation
--
-- ----------------------------------------

INSERT INTO `reservation` (`user_id`, `room_id`, `head_cnt`, `price`, `start_date`, `end_date`)
VALUES (@user_cheesecat47, @room_1, 3, 800000, '2024-05-10', '2024-05-14'),
       (@user_cheesecat47, @room_2, 4, 500000, '2024-05-20', '2024-05-25'),
       (@user_hoing97s, @room_3, 3, 250000, '2024-05-18', '2024-05-19');
