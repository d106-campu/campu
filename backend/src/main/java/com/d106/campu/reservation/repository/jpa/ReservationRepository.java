package com.d106.campu.reservation.repository.jpa;

import com.d106.campu.reservation.domain.jpa.Reservation;
import com.d106.campu.room.domain.jpa.Room;
import com.d106.campu.user.domain.jpa.User;
import java.util.List;
import java.time.LocalDate;
import java.util.Optional;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Page<Reservation> findByUser(Pageable pageable, User user);

    List<Reservation> findByUser_Account(String account);

    @Query("""
        SELECT r
        FROM Reservation r
        WHERE r.room = :room
            AND (
                (r.startDate = :startDate)
                OR ((:startDate < r.startDate) AND (r.startDate < :endDate))
                OR ((r.startDate < :startDate) AND (:startDate < r.endDate))
            )
        """)
    Optional<Reservation> existsReservationOnDateRangeInternal(
        @Param("room") Room room,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate,
        Limit limit
    );

    /**
     * @param room      Room that you want to reserve.
     * @param startDate Start date of your reservation.
     * @param endDate   End date of your reservation.
     * @return <code>true</code> if reservation exists on the range of date(cannot reserve), else <code>false</code>(can
     * reserve).
     * <pre>{@code
     * LocalDate startDate = LocalDate.of(2024, 5, 10);
     * LocalDate endDate = LocalDate.of(2024, 5, 15);
     * boolean res = reservationRepository.existsReservationOnDateRange(room, startDate, endDate);
     * }</pre>
     */
    default boolean existsReservationOnDateRange(Room room, LocalDate startDate, LocalDate endDate) {
        return existsReservationOnDateRangeInternal(room, startDate, endDate, Limit.of(1)).isPresent();
    }

}
