package com.d106.campu.room.domain.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.common.jpa.BaseTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Room extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campsite_id", nullable = false)
    private Campsite campsite;

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
    private int price;

    @Column(name = "extra_price")
    private int extraPrice;

    @Column(name = "room_cnt", nullable = false)
    private int roomCnt;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "toilet_cnt", nullable = false)
    private int toiletCnt;

    @Column(name = "supply_list")
    private String supplyList;

}
