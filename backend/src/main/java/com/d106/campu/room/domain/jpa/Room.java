package com.d106.campu.room.domain.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.common.jpa.BaseTime;
import com.d106.campu.emptynotification.domain.jpa.EmptyNotification;
import com.d106.campu.owner.dto.OwnerDto.RoomUpdateRequest;
import com.d106.campu.reservation.domain.jpa.Reservation;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import java.util.List;
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
public class Room extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campsite_id", nullable = false)
    private Campsite campsite;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "induty_id", nullable = false)
    private Induty induty;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "base_no", nullable = false)
    private int baseNo;

    @Column(name = "max_no", nullable = false)
    private int maxNo;

    @Column(name = "price", nullable = false)
    private Long price;

    @Column(name = "extra_price")
    private Long extraPrice;

    @Column(name = "room_cnt", nullable = false)
    private int roomCnt;

    @Setter
    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "toilet_cnt", nullable = false)
    private int toiletCnt;

    @Column(name = "supply_list")
    private String supplyList;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Reservation> reservationList;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<EmptyNotification> emptyNotificationList;

    @Transient
    @Setter
    private boolean available;

    public void updateRoomInfo(RoomUpdateRequest updateRequestDto) {
        this.name = updateRequestDto.getRoomName();
        this.price = updateRequestDto.getPrice();
        this.baseNo = updateRequestDto.getBaseNo();
        this.maxNo = updateRequestDto.getMaxNo();
        this.extraPrice = updateRequestDto.getExtraPrice();
        this.toiletCnt = updateRequestDto.isToilet() ? 1 : 0;
    }

}
