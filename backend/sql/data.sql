USE d106;

-- ----------------------------------------
--
-- user
--
-- ----------------------------------------

INSERT INTO `user` (`role`, `account`, `password`, `nickname`, `gender`, `birth_year`, `profile_image_url`, `tel`)
VALUES ('ADMIN', 'hoing97s', '$2a$10$uDjXQSDlHCWIXkO4SzfY7OVgs1aPBedacmj/8wHt1SjahOcEOY08y', 'hoing97s', 'M', '2000', 'https://avatars.githubusercontent.com/u/140311409', '00000000000'),
       ('USER', 'danbeeS2', '$2a$10$uDjXQSDlHCWIXkO4SzfY7OVgs1aPBedacmj/8wHt1SjahOcEOY08y', 'danbeeS2', 'F', '2000', 'https://avatars.githubusercontent.com/u/120550679', '00000000000'),
       ('USER', 'cheesecat47', '$2a$10$uDjXQSDlHCWIXkO4SzfY7OVgs1aPBedacmj/8wHt1SjahOcEOY08y', 'refo', 'M', '2000', 'https://avatars.githubusercontent.com/u/41780495', '00000000000'),
       ('USER', 'Agwii', '$2a$10$uDjXQSDlHCWIXkO4SzfY7OVgs1aPBedacmj/8wHt1SjahOcEOY08y', 'Agwii', 'M', '2000', 'https://avatars.githubusercontent.com/u/139833245', '00000000000'),
       ('USER', 'minnnnnk0', '$2a$10$uDjXQSDlHCWIXkO4SzfY7OVgs1aPBedacmj/8wHt1SjahOcEOY08y', 'minnnnnk', 'F', '2000', 'https://avatars.githubusercontent.com/u/139419164', '00000000000'),
       ('USER', 'choihojo', '$2a$10$uDjXQSDlHCWIXkO4SzfY7OVgs1aPBedacmj/8wHt1SjahOcEOY08y', 'choihojo', 'M', '2000', 'https://avatars.githubusercontent.com/u/87483951?', '00000000000'),
       ('OWNER', 'sajangnim', '$2a$10$uDjXQSDlHCWIXkO4SzfY7OVgs1aPBedacmj/8wHt1SjahOcEOY08y', 'sajang1', 'F', '2000', null, '00000000000'),
       ('USER', 'testd106', '$2a$12$5z6Bhj5BYHSw5XgYcFkwcu.p1GDdv/gHSTKr67LpdkJTqghM39LMe', 'test계정', 'F', '2000', null, '00000000004');

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

INSERT INTO `campsite` (`user_id`, `faclt_nm`, `faclt_div_nm`, `tel`, `line_intro`, `intro`, `allar`, `bizrno`, `trsagnt_no`, `do_nm`, `sigungu_nm`, `addr1`, `addr2`, `induty_list`, `thumbnail_image_url`, `map_image_url`, `homepage`, `sited_stnc`, `animal_cmg_cl`, `hit`, `checkin`, `checkout`)
VALUES (@user_manager, '캠프유캠푸 캠핑장', '민간', '01012312312', '이국적인 캐러밴과 알찬 부대시설', '캠프유캠푸 캠핑장은 열정 넘치는 사장님들이 캐러밴 여러 대로 캠핑장을 꾸몄다.', 6600, '169-52-00647', '2017-6', '경상북도', '구미시', '경북 구미시 3공단3로 302', null, '카라반', 'https://gocamping.or.kr/upload/camp/10/thumb/thumb_720_1869epdMHtUyrinZWKFHDWty.jpg', null, null, 10, '불가능', 10, '15:00', '11:00'),
       (@user_manager, '싸피 글램핑', '민간', '033263330', NULL, NULL, 4000, '802-23-00574', '2017-00005', '경상북도', '구미시', '경상북도 구미시 인의동 4-2', NULL, '자동차야영장,카라반,글램핑', 'https://gocamping.or.kr/upload/camp/3511/thumb/thumb_720_2711bF0RySFuTljb4HgPRx3m.jpg', null, 'http://hobancamping.com', 0, '불가능', 2, '15:00', '12:00'),
       (@user_manager, '캠핑106', '지자체', '033461337', '반려견 산책로,수영장,체육관을 갖춘 반려동물 친화 캠핑장', '자작나무 숲을 끼고 있는 2만여 평의 넓은 부지를 갖춘 리조트&캠핑장으로 반려 가족 전용 시설로, 직원 모두 반려동물 관련 자격증을 가지고 있다. 총 30개의 객실이 있는 리조트와 38개의 캠핑장이 구비되어 있으며, 차박 및 카라반, 캠핑카도 요금을 추가하면 이용할 수 있다. 우천 시 또는 겨울 시즌에 이용할 수 있는 실내 체육관에서는 어질리티 대회 등 각종 행사가 진행되기도 한다. 부대시설로는 식당과 반려견 호텔 및 카페, 스토어가 있으며 반려 가족 전용시설답게 반려견 의무실도 갖추고 있다.', 1874, '635-87-02125', NULL, '경상북도', '구미시', '경상북도 구미시 공단동 438', NULL, '일반야영장', 'https://gocamping.or.kr/upload/camp/100183/thumb/thumb_720_5468clszlFwrSDn7oSCJO7uX.jpg', null, 'www.lifewithdog.co.kr', 0, '가능', 1, '14:00', '10:00'),
       (@user_manager, '호 카라반 캠핑', '민간', '033263330', '글램핑, 야영장입니다.', '예쁜 정원과 함께하는 글램핑 정원과 함께 힐링할 수 있는 호 카라반 캠핑은 예쁜 정원 콘테스트에서 최우수상을 수상한 림스가든 안에 자리하고 있어 동화 속 같은 아름다운 정원에서 감성 글램핑을 즐길 수 있다. 아늑한 글램핑 내부 인테리어와 아이들이 신나게 물놀이할 수 있는 수영장과 트램펄린, 산책 코스까지 완벽한 편의 시설을 자랑한다. 또한 모든 객실은 세스코 관리를 받고 있어 더욱 믿을만하다. 반려견, 숯, 장작 등 개인 화기 및 반려견 동반은 불가하며 근처에 월출산과 가우도는 함께 둘러보기 좋은 관광 명소이다.', 6600, '853-60-00338', '2021-1', '경상북도', '구미시', '경상북도 구미시 진평동 산17-1', NULL, '일반야영장,카라반,글램핑', 'https://gocamping.or.kr/upload/camp/100008/thumb/thumb_720_6107z9OQLZWk9dvIhx8OblHM.jpg', null, 'http://limsglamping.modoo.at', 0, '불가능', 2, '15:00', '10:00'),
       (@user_manager, '단비 글램핑', '민간', '0548555578', '', '', '0', '', '', '경상북도', '구미시', '경상북도 구미시 황상동 산12-1', '', '글램핑,카라반', 'https://gocamping.or.kr/upload/camp/981/thumb/thumb_720_448887nIRhkouOYi9sR1XhfI.jpg', null, 'http://luxeglampingfarm.com/', 0, '불가능', 54, '14:00', '11:00');

SET @campsite_1 = (SELECT id FROM `campsite` WHERE faclt_nm = '캠프유캠푸 캠핑장');
SET @campsite_2 = (SELECT id FROM `campsite` WHERE faclt_nm = '싸피 글램핑');
SET @campsite_3 = (SELECT id FROM `campsite` WHERE faclt_nm = '캠핑106');
SET @campsite_4 = (SELECT id FROM `campsite` WHERE faclt_nm = '호 카라반 캠핑');
SET @campsite_5 = (SELECT id FROM `campsite` WHERE faclt_nm = '단비 글램핑');

INSERT INTO `campsite_location` (`campsite_id`, `map_x`, `map_y`)
VALUES (@campsite_1, 128.416984, 36.107138),
       (@campsite_2, 128.333815, 36.104510),
       (@campsite_3, 128.393302, 36.118434),
       (@campsite_4, 128.417307, 36.094639),
       (@campsite_5, 128.439646, 36.113250);

INSERT INTO `campsite_like` (`campsite_id`, `user_id`)
VALUES (@campsite_1, @user_cheesecat47),
       (@campsite_3, @user_cheesecat47),
       (@campsite_1, @user_hoing97s),
       (@campsite_2, @user_hoing97s),
       (@campsite_5, @user_hoing97s),
       (@campsite_2, @user_danbeeS2),
       (@campsite_3, @user_danbeeS2),
       (@campsite_4, @user_danbeeS2),
       (@campsite_1, @user_Agwii),
       (@campsite_2, @user_Agwii),
       (@campsite_4, @user_Agwii),
       (@campsite_1, @user_minnnnnk0),
       (@campsite_3, @user_minnnnnk0),
       (@campsite_4, @user_minnnnnk0),
       (@campsite_2, @user_choihojo),
       (@campsite_3, @user_choihojo),
       (@campsite_5, @user_choihojo),
       (@campsite_3, @user_manager);

INSERT INTO `campsite_image` (`id`, `campsite_id`, `url`)
VALUES ('1', '1', '/file/campsite/1/general/27c0370e-125a-45cc-865d-ccd3b2cdc5af_anna-philine-VAf6-e22Ono-unsplash.jpg'),
       ('2', '1', '/file/campsite/1/general/7b22d1b3-3b86-4f39-8597-3d9b3d8d8686_joshua-sukoff-wXzuPjvTZf8-unsplash.jpg'),
       ('3', '1', '/file/campsite/1/general/3b6c8f1a-ce28-43f2-8088-6d5343672625_hugues-de-buyer-mimeure-hGuGRayJrv0-unsplash.jpg'),
       ('4', '1', '/file/campsite/1/general/a75df483-661f-4649-8ad5-5f716e00a745_scott-goodwill-y8Ngwq34_Ak-unsplash.jpg'),
       ('5', '1', '/file/campsite/1/general/ec6c8fc7-8e89-4cf1-8391-fd9f1f1a536a_paul-hermann-XJuhZqEE4Go-unsplash.jpg');

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
VALUES ('여름물놀이'), ('걷기길'), ('액티비티'), ('봄꽃여행'), ('가을단풍명소'), ('겨울눈꽃명소'), ('일몰명소'), ('일출명소'), ('수상레저'), ('낚시'), ('항공레저'), ('스키');

SET @theme_summer = (SELECT id from `theme` where theme = '여름물놀이');
SET @theme_trail = (SELECT id from `theme` where theme = '걷기길');
SET @theme_activity = (SELECT id from `theme` where theme = '액티비티');
SET @theme_spring = (SELECT id from `theme` where theme = '봄꽃여행');
SET @theme_autumn = (SELECT id from `theme` where theme = '가을단풍명소');
SET @theme_winter = (SELECT id from `theme` where theme = '겨울눈꽃명소');
SET @theme_sunset = (SELECT id from `theme` where theme = '일몰명소');
SET @theme_sunrise = (SELECT id from `theme` where theme = '일출명소');
SET @theme_water = (SELECT id from `theme` where theme = '수상레저');
SET @theme_fishing = (SELECT id from `theme` where theme = '낚시');
SET @theme_aero = (SELECT id from `theme` where theme = '항공레저');
SET @theme_ski = (SELECT id from `theme` where theme = '스키');

INSERT INTO `campsite_theme` (`campsite_id`, `theme_id`)
VALUES (@campsite_1, @theme_summer),
       (@campsite_1, @theme_activity),
       (@campsite_1, @theme_water),
       (@campsite_1, @theme_fishing),
       (@campsite_2, @theme_autumn),
       (@campsite_2, @theme_trail),
       (@campsite_2, @theme_sunset),
       (@campsite_3, @theme_winter),
       (@campsite_3, @theme_ski),
       (@campsite_3, @theme_activity),
       (@campsite_4, @theme_spring),
       (@campsite_4, @theme_sunrise),
       (@campsite_4, @theme_trail),
       (@campsite_5, @theme_sunrise),
       (@campsite_5, @theme_sunset),
       (@campsite_5, @theme_autumn);

-- ----------------------------------------
--
-- fclty
--
-- ----------------------------------------

INSERT INTO `fclty` (`fclty`)
VALUES ('TV'), ('난방기구'), ('내부샤워실'), ('내부화장실'), ('냉장고'), ('에어컨'), ('유무선인터넷'), ('취사도구'), ('침대');

SET @fclty_tv = (SELECT id from `fclty` where fclty = 'TV');
SET @fclty_heater = (SELECT id from `fclty` where fclty = '난방기구');
SET @fclty_shower = (SELECT id from `fclty` where fclty = '내부샤워실');
SET @fclty_toilet = (SELECT id from `fclty` where fclty = '내부화장실');
SET @fclty_fridge = (SELECT id from `fclty` where fclty = '냉장고');
SET @fclty_airconditioner = (SELECT id from `fclty` where fclty = '에어컨');
SET @fclty_internet = (SELECT id from `fclty` where fclty = '유무선인터넷');
SET @fclty_cookingware = (SELECT id from `fclty` where fclty = '취사도구');
SET @fclty_bed = (SELECT id from `fclty` where fclty = '침대');

INSERT INTO `campsite_fclty` (`campsite_id`, `fclty_id`)
VALUES (@campsite_1, @fclty_tv),
       (@campsite_1, @fclty_toilet),
       (@campsite_1, @fclty_airconditioner),
       (@campsite_2, @fclty_heater),
       (@campsite_2, @fclty_shower),
       (@campsite_2, @fclty_tv),
       (@campsite_2, @fclty_toilet),
       (@campsite_3, @fclty_shower),
       (@campsite_3, @fclty_toilet),
       (@campsite_3, @fclty_cookingware),
       (@campsite_3, @fclty_tv),
       (@campsite_4, @fclty_bed),
       (@campsite_4, @fclty_heater),
       (@campsite_4, @fclty_tv),
       (@campsite_4, @fclty_airconditioner),
       (@campsite_5, @fclty_tv),
       (@campsite_5, @fclty_shower),
       (@campsite_5, @fclty_fridge),
       (@campsite_5, @fclty_airconditioner),
       (@campsite_5, @fclty_internet);

-- ----------------------------------------
--
-- room
--
-- ----------------------------------------

INSERT INTO `room` (`campsite_id`, `induty_id`, `name`, `base_no`, `max_no`, `price`, `extra_price`, `room_cnt`, `toilet_cnt`, `supply_list`)
VALUES (@campsite_1, @induty_caravan, 'A구역 (벚꽃 캠핑존)', 2, 4, 100000, 50000, 1, 1, null),
       (@campsite_1, @induty_caravan, 'B구역 (별빛 캠핑존)', 2, 2, 100000, 0, 1, 1, null),
       (@campsite_1, @induty_caravan, 'C구역 (바베큐존)', 4, 6, 200000, 50000, 1, 1, null),
       (@campsite_2, @induty_autocamping, '오토캠핑1', 4, 6, 100000, 50000, 1, 1, null),
       (@campsite_2, @induty_autocamping, '오토캠핑2', 4, 6, 100000, 50000, 1, 1, null),
       (@campsite_2, @induty_caravan, '카라반1', 2, 3, 200000, 50000, 1, 1, null),
       (@campsite_2, @induty_glamping, '글램핑A', 4, 4, 300000, 0, 3, 2, null),
       (@campsite_2, @induty_glamping, '글램핑B', 4, 4, 300000, 0, 3, 2, null),
       (@campsite_3, @induty_camping, '평상1', 2, 3, 100000, 30000, 1, 1, null),
       (@campsite_3, @induty_camping, '평상2', 3, 3, 120000, 0, 1, 1, null),
       (@campsite_3, @induty_camping, '평상3', 4, 4, 150000, 0, 1, 1, null),
       (@campsite_3, @induty_camping, '평상4', 5, 6, 180000, 50000, 1, 1, null),
       (@campsite_4, @induty_caravan, '카라반A', 2, 3, 200000, 50000, 1, 1, null),
       (@campsite_4, @induty_caravan, '카라반B', 2, 3, 200000, 50000, 1, 1, null),
       (@campsite_4, @induty_glamping, '글램핑1', 4, 6, 300000, 80000, 3, 2, null),
       (@campsite_4, @induty_glamping, '글램핑2', 4, 6, 300000, 80000, 3, 2, null),
       (@campsite_4, @induty_camping, '캠핑존', 2, 4, 100000, 50000, 1, 1, null),
       (@campsite_5, @induty_glamping, '글램핑A', 4, 6, 300000, 80000, 3, 2, null),
       (@campsite_5, @induty_glamping, '글램핑B', 4, 6, 300000, 80000, 3, 2, null),
       (@campsite_5, @induty_caravan, '카라반A', 2, 3, 200000, 50000, 1, 1, null),
       (@campsite_5, @induty_caravan, '카라반B', 2, 3, 200000, 50000, 1, 1, null);

SET @room_1 = (SELECT id FROM `room` WHERE campsite_id = @campsite_1 AND name = 'A구역 (벚꽃 캠핑존)');
SET @room_2 = (SELECT id FROM `room` WHERE campsite_id = @campsite_2 AND name = '오토캠핑1');
SET @room_3 = (SELECT id FROM `room` WHERE campsite_id = @campsite_3 AND name = '평상1');
SET @room_4 = (SELECT id FROM `room` WHERE campsite_id = @campsite_4 AND name = '글램핑1');
SET @room_5 = (SELECT id FROM `room` WHERE campsite_id = @campsite_5 AND name = '카라반A');

-- ----------------------------------------
--
-- reservation
--
-- ----------------------------------------

INSERT INTO `reservation` (`user_id`, `room_id`, `head_cnt`, `price`, `start_date`, `end_date`)
VALUES (@user_cheesecat47, @room_1, 3, 800000, '2024-05-10', '2024-05-14'),
       (@user_hoing97s, @room_1, 3, 200000, '2024-05-14', '2024-05-15'),
       (@user_Agwii, @room_1, 3, 200000, '2024-05-20', '2024-05-21'),
       (@user_cheesecat47, @room_2, 4, 500000, '2024-05-08', '2024-05-09'),
       (@user_hoing97s, @room_2, 3, 500000, '2024-05-11', '2024-05-13'),
       (@user_danbeeS2, @room_2, 3, 500000, '2024-05-16', '2024-05-17'),
       (@user_choihojo, @room_3, 3, 250000, '2024-05-18', '2024-05-19'),
       (@user_hoing97s, @room_3, 3, 250000, '2024-05-20', '2024-05-21'),
       (@user_minnnnnk0, @room_3, 3, 250000, '2024-05-23', '2024-05-24'),
       (@user_danbeeS2, @room_4, 3, 250000, '2024-05-10', '2024-05-11'),
       (@user_Agwii, @room_4, 3, 250000, '2024-05-15', '2024-05-16'),
       (@user_hoing97s, @room_4, 3, 250000, '2024-05-18', '2024-05-19'),
       (@user_minnnnnk0, @room_5, 3, 250000, '2024-05-10', '2024-05-15'),
       (@user_danbeeS2, @room_5, 3, 250000, '2024-05-18', '2024-05-20'),
       (@user_cheesecat47, @room_5, 3, 250000, '2024-05-24', '2024-05-25');

SET @reservation_1 = (SELECT id FROM `reservation` WHERE user_id = @user_cheesecat47 AND room_id = @room_1);
SET @reservation_2 = (SELECT id FROM `reservation` WHERE user_id = @user_hoing97s AND room_id = @room_2);
SET @reservation_3 = (SELECT id FROM `reservation` WHERE user_id = @user_choihojo AND room_id = @room_3);
SET @reservation_4 = (SELECT id FROM `reservation` WHERE user_id = @user_Agwii AND room_id = @room_4);
SET @reservation_5 = (SELECT id FROM `reservation` WHERE user_id = @user_minnnnnk0 AND room_id = @room_5);
SET @reservation_6 = (SELECT id FROM `reservation` WHERE user_id = @user_hoing97s AND room_id = @room_1);
SET @reservation_7 = (SELECT id FROM `reservation` WHERE user_id = @user_danbeeS2 AND room_id = @room_2);
SET @reservation_8 = (SELECT id FROM `reservation` WHERE user_id = @user_hoing97s AND room_id = @room_3);
SET @reservation_9 = (SELECT id FROM `reservation` WHERE user_id = @user_danbeeS2 AND room_id = @room_4);
SET @reservation_10 = (SELECT id FROM `reservation` WHERE user_id = @user_cheesecat47 AND room_id = @room_5);

-- ----------------------------------------
--
-- review
--
-- ----------------------------------------

INSERT INTO `review` (`campsite_id`, `reservation_id`, `score`, `content`)
VALUES (@campsite_1, @reservation_1, 5, 'message'),
       (@campsite_1, @reservation_6, 4, 'message'),
       (@campsite_2, @reservation_2, 4, 'message'),
       (@campsite_2, @reservation_7, 3, 'message'),
       (@campsite_3, @reservation_3, 3, 'message'),
       (@campsite_3, @reservation_8, 5, 'message'),
       (@campsite_4, @reservation_4, 4, 'message'),
       (@campsite_4, @reservation_9, 4, 'message'),
       (@campsite_5, @reservation_5, 5, 'message'),
       (@campsite_5, @reservation_10, 4, 'message');

-- ----------------------------------------
--
-- empty_notification
--
-- ----------------------------------------

INSERT INTO `empty_notification` (`user_id`, `room_id`, `start_date`, `end_date`)
VALUES (@user_minnnnnk0, @room_1, '2024-05-20', '2024-05-21'),
       (@user_hoing97s, @room_2, '2024-05-19', '2024-05-20'),
       (@user_danbeeS2, @room_3, '2024-05-20', '2024-05-22'),
       (@user_choihojo, @room_4, '2024-05-19', '2024-05-20'),
       (@user_Agwii, @room_5, '2024-05-19', '2024-05-20');
