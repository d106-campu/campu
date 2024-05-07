package com.d106.campu.repository.jpa;

import static org.assertj.core.api.Assertions.assertThat;

import com.d106.campu.auth.constant.RoleName;
import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.repository.jpa.CampsiteRepository;
import com.d106.campu.reservation.domain.jpa.Reservation;
import com.d106.campu.reservation.repository.jpa.ReservationRepository;
import com.d106.campu.room.domain.jpa.Induty;
import com.d106.campu.room.domain.jpa.Room;
import com.d106.campu.room.repository.jpa.IndutyRepository;
import com.d106.campu.room.repository.jpa.RoomRepository;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.repository.jpa.UserRepository;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

@ActiveProfiles("test")
@DataJpaTest
@TestPropertySource(locations = "classpath:application-test.yml")
@AutoConfigureTestDatabase(replace = Replace.NONE)
class ReservationRepositoryTest {

    private static final Logger log = LoggerFactory.getLogger(ReservationRepositoryTest.class);
    @Autowired UserRepository userRepository;
    @Autowired CampsiteRepository campsiteRepository;
    @Autowired IndutyRepository indutyRepository;
    @Autowired RoomRepository roomRepository;
    @Autowired ReservationRepository reservationRepository;

    User owner = User.builder().role(RoleName.OWNER).account("o").password("p").nickname("o").tel("01012312310").build();
    User tester = User.builder().role(RoleName.USER).account("t").password("p").nickname("t").tel("01012312311").build();
    Campsite campsite = Campsite.builder().user(owner).facltNm("캠프유캠푸 캠핑장").tel("01012312310").build();
    Induty induty = Induty.builder().induty("카라반").build();
    Room room1 = Room.builder().campsite(campsite).induty(induty).name("r").baseNo(4).maxNo(6).price(100000).roomCnt(1)
        .toiletCnt(1).build();

    @BeforeEach
    void prepare() {
        userRepository.saveAll(List.of(owner, tester));
        campsiteRepository.save(campsite);
        indutyRepository.save(induty);
        roomRepository.save(room1);

        Reservation reservation1 = Reservation.builder().user(tester).room(room1)
            .startDate(LocalDate.of(2024, 5, 10)).endDate(LocalDate.of(2024, 5, 14)).build();
        Reservation reservation2 = Reservation.builder().user(tester).room(room1)
            .startDate(LocalDate.of(2024, 5, 20)).endDate(LocalDate.of(2024, 5, 25)).build();
        reservationRepository.saveAll(List.of(reservation1, reservation2));
    }

    @DisplayName("특정 방에 대해 특정 기간에 예약이 존재하는지 확인")
    @ParameterizedTest(name = "#{index} {0}")
    @CsvSource({
        "예약 가능, 2024, 5, 14, 2024, 5, 15, false",
        "예약 불가 - 시작일이 다른 예약과 겹침, 2024, 5, 13, 2024, 5, 15, true",
        "예약 불가 - 종료일이 다른 예약과 겹침, 2024, 5, 8, 2024, 5, 11, true",
        "예약 불가 - 기간 내 다른 예약이 존재, 2024, 5, 8, 2024, 5, 14, true",
        "예약 가능, 2024, 5, 14, 2024, 5, 20, false",
        "예약 불가 - 시작일과 종료일 모두 다른 예약과 겹침, 2024, 5, 13, 2024, 5, 21, true"
    })
    void testCanReserve(String description, int sy, int sm, int sd, int ey, int em, int ed, boolean expected) {
        boolean res = reservationRepository.existsReservationOnDateRange(
            room1,
            LocalDate.of(sy, sm, sd),
            LocalDate.of(ey, em, ed));
        assertThat(res).isEqualTo(expected);
    }

}
