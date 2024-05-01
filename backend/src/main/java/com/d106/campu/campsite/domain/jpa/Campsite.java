package com.d106.campu.campsite.domain.jpa;

import com.d106.campu.common.jpa.BaseTime;
import com.d106.campu.user.domain.jpa.User;
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
import lombok.Setter;

@Getter
@Builder
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Campsite extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @Setter
    private User user;

    @Column(name = "faclt_nm", length = 128)
    private String facltNm;

    @Column(name = "faclt_div_nm", length = 16)
    private String facltDivNm;

    @Column(name = "tel", length = 11, unique = true, nullable = false)
    private String tel;

    @Column(name = "line_intro", length = 512)
    private String lineIntro;

    @Column(name = "intro", length = 2048)
    private String intro;

    @Column(name = "allar")
    private int allar;

    @Column(name = "bizrno", length = 32)
    private String bizrno;

    @Column(name = "trsagnt_no", length = 32)
    private String trsagntNo;

    @Column(name = "do_nm", length = 32)
    private String doNm;

    @Column(name = "sigungu_nm", length = 64)
    private String sigunguNm;

    @Column(name = "addr1", length = 512)
    private String addr1;

    @Column(name = "addr2", length = 512)
    private String addr2;

    @Column(name = "induty_list", length = 128)
    private String indutyList;

    @Column(name = "thumbnail_image_url", length = 1024)
    private String thumbnailImageUrl;

    @Column(name = "map_image_url", length = 1024)
    private String mapImageUrl;

    @Column(name = "homepage", length = 1024)
    private String homepage;

    @Column(name = "sited_stnc")
    private int sitedStnc;

    @Column(name = "animal_cmg_cl", length = 16)
    private String animalCmgCl;

    @Column(name = "hit")
    private long hit;

}
