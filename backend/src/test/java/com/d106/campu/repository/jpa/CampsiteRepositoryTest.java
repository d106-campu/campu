package com.d106.campu.repository.jpa;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.dto.CampsiteDto;
import com.d106.campu.campsite.mapper.CampsiteMapper;
import com.d106.campu.campsite.mapper.CampsiteMapperImpl;
import com.d106.campu.campsite.repository.jpa.CampsiteRepository;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.repository.jpa.UserRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

@ActiveProfiles("test")
@DataJpaTest
@TestPropertySource(locations = "classpath:application-test.yml")
@AutoConfigureTestDatabase(replace = Replace.NONE)
@ComponentScan(basePackageClasses = {CampsiteMapper.class, CampsiteMapperImpl.class})
class CampsiteRepositoryTest {

    @Autowired
    CampsiteRepository campsiteRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CampsiteMapper campsiteMapper;

    @DisplayName("테스트 데이터 추가")
    @BeforeEach
    void prepare() {
        User user = User.builder()
            .account("testuser1")
            .password("testpw1")
            .nickname("user")
            .tel("01012312310")
            .build();

        User savedUser = userRepository.save(user);
        assertThat(savedUser).isEqualTo(user);

        Campsite campsite = Campsite.builder()
            .user(user)
            .facltNm("캠프유캠푸 캠핑장")
            .tel("01012312310")
            .build();
        Campsite savedCampsite = campsiteRepository.save(campsite);
        assertThat(savedCampsite).isEqualTo(campsite);
    }

    @DisplayName("캠핑장 전체 목록 조회")
    @Test
    public void findAll() {
        List<Campsite> result = campsiteRepository.findAll();
        assertThat(result.size()).isGreaterThanOrEqualTo(1);
    }

    @DisplayName("캠핑장 등록 - 정상")
    @Test
    public void createCampsite1() {
        // given
        CampsiteDto.CreateRequest createRequestDto = CampsiteDto.CreateRequest.builder()
            .user(userRepository.findByAccount("testuser1").get())
            .facltNm("캠프유캠푸 캠핑장1")
            .tel("01012312311")
            .build();

        // when
        Campsite campsite = campsiteMapper.toCampsite(createRequestDto);
        campsiteRepository.save(campsite);

        // then
        Optional<Campsite> result = campsiteRepository.findByFacltNm(campsite.getFacltNm());

        assertThat(result).isNotNull();
        assertThat(result.get()).isEqualTo(campsite);
    }

    @DisplayName("캠핑장 등록 - 실패: 유저 없는 경우")
    @Test
    public void createCampsite2() {
        // given
        CampsiteDto.CreateRequest createRequestDto = CampsiteDto.CreateRequest.builder()
            .facltNm("캠프유캠푸 캠핑장1")
            .tel("01012312312")
            .build();

        // when
        Campsite campsite = campsiteMapper.toCampsite(createRequestDto);
        assertThatThrownBy(() -> campsiteRepository.save(campsite));
    }

    @DisplayName("캠핑장 등록 - 실패: 유효성 검사 실패")
    @Test
    public void createCampsite3() {
        // given
        CampsiteDto.CreateRequest createRequestDto = CampsiteDto.CreateRequest.builder()
            .user(userRepository.findByAccount("testuser1").get())
            .facltNm("캠프유캠푸 캠핑장")
            .tel("012345678901")
            .build();

        // when
        Campsite campsite = campsiteMapper.toCampsite(createRequestDto);
        assertThatThrownBy(() -> campsiteRepository.save(campsite));
    }

}
