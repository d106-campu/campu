package com.d106.campu.repository.jpa;

import static org.assertj.core.api.Assertions.assertThat;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.repository.jpa.CampsiteRepository;
import com.d106.campu.user.repository.jpa.UserRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Transactional
class CampsiteRepositoryTest {

    @Autowired
    CampsiteRepository campsiteRepository;

    @Autowired
    UserRepository userRepository;

    @Test
    public void findAll() {
        Campsite campsite1 = Campsite.builder()
            .user(userRepository.findById(1L).get())
            .facltNm("캠프유캠푸 캠핑장")
            .facltDivNm("민간")
            .tel("01012312312")
            .lineIntro("이국적인 캐러밴과 알찬 부대시설")
            .intro(
                "강원도 춘천시 남면에 자리했다. 서울양양고속도로 강촌IC에서 엘리시안강촌 방면으로 30분가량 달리면 도착한다. 이곳은 북한강 변의 수려한 풍광을 배경으로 캐러밴 40대가 들어찼다. 고급스러움이 돋보이는 유럽피안 캐러밴과 에어스트림 캐러밴이다. 모든 캐러밴은 각기 다른 주제로 꾸몄다. 이 덕분에 욕실에 중점을 둔 객실이나 침실에 초점을 맞춘 객실 등 취향에 따라 선택하는 재미가 있다. 외부에는 어닝 아래 테이블, 의자, 노천욕탕, 바비큐 시설을 마련했다. 캠핑장의 강점 중 하나는 부대시설이다. 카페, 수영장, 찜질방, 스파, 중앙 무대, 분수, 노래방 등 고급스러움으로 치장한 시설이 차고 넘친다.")
            .allar(6600)
            .bizrno("2017-6")
            .trsagntNo("169-52-00000")
            .doNm("강원도")
            .sigunguNm("춘천시")
            .addr1("강원도 춘천시 남면 가옹개길 52-9")
            .indutyList("카라반")
            .thumbnailImageUrl("https://gocamping.or.kr/upload/camp/10/thumb/thumb_720_1869epdMHtUyrinZWKFHDWty.jpg")
            .sitedStnc(10)
            .animalCmgCl("불가능")
            .hit(10)
            .build();

        campsiteRepository.save(campsite1);

        List<Campsite> result = campsiteRepository.findAll();

        assertThat(result.size()).isEqualTo(1);
    }
}
