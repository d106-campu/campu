package com.d106.campu.repository.jpa;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.d106.campu.auth.constant.RoleName;
import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.dto.CampsiteDto;
import com.d106.campu.campsite.mapper.CampsiteMapper;
import com.d106.campu.campsite.mapper.CampsiteMapperImpl;
import com.d106.campu.campsite.repository.jpa.CampsiteRepository;
import com.d106.campu.common.constant.DoNmEnum;
import com.d106.campu.common.constant.SigunguEnum;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.repository.jpa.UserRepository;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.domain.Page;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

@ActiveProfiles("test")
@DataJpaTest
@TestPropertySource(locations = "classpath:application-test.yml")
@AutoConfigureTestDatabase(replace = Replace.NONE)
@ComponentScan(basePackageClasses = {CampsiteMapper.class, CampsiteMapperImpl.class})
class CampsiteRepositoryTest {

    @Autowired CampsiteRepository campsiteRepository;
    @Autowired UserRepository userRepository;
    @Autowired CampsiteMapper campsiteMapper;

    User owner = User.builder().role(RoleName.OWNER).account("o").password("p").nickname("o").tel("01012312310").build();
    Campsite campsite1 = Campsite.builder().user(owner).facltNm("c1").tel("01012312310")
        .doNm(DoNmEnum.경상북도.getName())
        .sigunguNm(SigunguEnum.구미시.getName())
        .indutyList("일반야영장,카라반")
        .build();
    Campsite campsite2 = Campsite.builder().user(owner).facltNm("c2").tel("01012312311")
        .doNm(DoNmEnum.경상북도.getName())
        .sigunguNm(SigunguEnum.구미시.getName())
        .indutyList("카라반")
        .build();

    @DisplayName("테스트 데이터 추가")
    @BeforeEach
    void prepare() {
        userRepository.save(owner);
        campsiteRepository.saveAll(List.of(campsite1, campsite2));
    }

    @Test
    @DisplayName("캠핑장 전체 목록 조회")
    void findAll() {
        List<Campsite> result = campsiteRepository.findAll();
        assertThat(result.size()).isGreaterThanOrEqualTo(2);
    }

    @ParameterizedTest(name = "#{index} {0}")
    @CsvSource({
        "일반야영장 유형이 있는 조회, 일반야영장, 1",
        "카라반 유형이 있는 캠핑장 조회, 카라반, 2",
        "존재하지 않는 유형으로 캠핑장 조회, ABC, 0"
    })
    @DisplayName("캠핑장 유형별 목록 조회")
    void findByInduty(String description, String induty, int expected) {
        Page<Campsite> result = campsiteRepository.findByIndutyListContaining(null, DoNmEnum.경상북도.getName(),
            SigunguEnum.구미시.getName(), induty);
        assertThat(result.getTotalElements()).isEqualTo(expected);
    }

    @Nested
    @DisplayName("캠핑장 등록 테스트")
    class Register {

        @Test
        @DisplayName("등록 성공")
        public void createCampsite1() {
            CampsiteDto.CreateRequest createRequestDto = CampsiteDto.CreateRequest.builder()
                .user(owner)
                .facltNm("c3")
                .doNm(DoNmEnum.경상북도.getName())
                .sigunguNm(SigunguEnum.구미시.getName())
                .tel("01012312312")
                .indutyList("카라반,자동차야영장")
                .build();

            Campsite campsite = campsiteMapper.toCampsite(createRequestDto);
            Campsite savedCampsite = campsiteRepository.save(campsite);
            assertThat(savedCampsite).isEqualTo(campsite);
        }

        @Test
        @DisplayName("등록 실패: 유저 없는 경우")
        public void createCampsite2() {
            Campsite campsite = Campsite.builder().facltNm("c4").tel("01012312313")
                .doNm(DoNmEnum.경상북도.getName())
                .sigunguNm(SigunguEnum.구미시.getName())
                .indutyList("카라반")
                .build();

            assertThatThrownBy(() -> campsiteRepository.save(campsite));
        }

        @Test
        @DisplayName("등록 실패: 유효성 검사 실패")
        public void createCampsite3() {
            Campsite campsite = Campsite.builder().facltNm("c5").tel("012345678901")
                .user(owner)
                .doNm(DoNmEnum.경상북도.getName())
                .sigunguNm(SigunguEnum.구미시.getName())
                .indutyList("카라반")
                .build();
            
            assertThatThrownBy(() -> campsiteRepository.save(campsite));
        }
    }

}
