package com.d106.campu.repository.jpa;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.dto.CampsiteDto;
import com.d106.campu.campsite.mapper.CampsiteMapper;
import com.d106.campu.campsite.repository.jpa.CampsiteRepository;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.repository.jpa.UserRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
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

    @Autowired
    CampsiteMapper campsiteMapper;

    @BeforeEach
    void 테스트_데이터_추가() {
        User user = userRepository.save(User.builder()
            .account("testuser1")
            .password("testpw1")
            .nickname("user")
            .tel("01012312311")
            .build());

        campsiteRepository.save(Campsite.builder()
            .user(user)
            .facltNm("캠프유캠푸 캠핑장")
            .build());
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
        CampsiteDto.CreateRequest createRequest = CampsiteDto.CreateRequest.builder()
            .user(userRepository.findByAccount("testuser1").get())
            .facltNm("캠프유캠푸 캠핑장1")
            .build();

        // when
        Campsite campsite = campsiteMapper.toCampsite(createRequest);
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
        CampsiteDto.CreateRequest createRequest = CampsiteDto.CreateRequest.builder()
            .facltNm("캠프유캠푸 캠핑장1")
            .build();

        // when
        Campsite campsite = campsiteMapper.toCampsite(createRequest);
        assertThatThrownBy(() -> campsiteRepository.save(campsite))
            .hasMessageContaining("Column 'user_id' cannot be null");
    }

    @DisplayName("캠핑장 등록 - 실패: 유효성 검사 실패")
    @Test
    public void createCampsite3() {
        // given
        CampsiteDto.CreateRequest createRequest1 = CampsiteDto.CreateRequest.builder()
            .user(userRepository.findByAccount("testuser1").get())
            .facltNm("캠프유캠푸 캠핑장")
            .tel("012345678901")
            .build();

        // when
        Campsite campsite1 = campsiteMapper.toCampsite(createRequest1);
        assertThatThrownBy(() -> campsiteRepository.save(campsite1))
            .hasMessageContaining("Data too long for column 'tel' at row 1");
    }

    @Test
    public void 캠핑장_유형별_목록_조회() {
        List<Campsite> result = campsiteRepository.findByIndutyListContaining(null, "일반야영장").toList();
        assertThat(result.size()).isEqualTo(1);

        result = campsiteRepository.findByIndutyListContaining(null, "카라반").toList();
        assertThat(result.size()).isEqualTo(2);

        result = campsiteRepository.findByIndutyListContaining(null, "존재하지않는유형").toList();
        assertThat(result.size()).isEqualTo(0);
    }

}
