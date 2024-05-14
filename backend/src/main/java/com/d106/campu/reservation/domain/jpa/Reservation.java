package com.d106.campu.reservation.domain.jpa;

import com.d106.campu.common.jpa.BaseTime;
import com.d106.campu.reservation.constant.PaymentStatus;
import com.d106.campu.room.domain.jpa.Room;
import com.d106.campu.user.domain.jpa.User;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.SecondaryTable;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SecondaryTable(name = "reservation_payment", pkJoinColumns = @PrimaryKeyJoinColumn(name = "reservation_id", referencedColumnName = "id"))
public class Reservation extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Column(name = "head_cnt", nullable = false)
    private int headCnt;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    @Setter
    private PaymentStatus status;

    @Column(name = "price", nullable = false)
    private Long price;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @OneToOne(fetch = FetchType.LAZY)
    private ReservationCancel reservationCancel;

    @Embedded
    private ReservationPayment reservationPayment;

    public void setReference(User user, Room room, ReservationPayment reservationPayment) {
        this.user = user;
        this.room = room;
        this.reservationPayment = reservationPayment;
    }

    public void cancelPayment(ReservationCancel reservationCancel) {
        this.reservationCancel = reservationCancel;
    }

}
