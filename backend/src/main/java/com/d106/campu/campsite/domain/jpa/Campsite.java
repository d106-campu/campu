package com.d106.campu.campsite.domain.jpa;

import com.d106.campu.common.jpa.BaseTime;
import com.d106.campu.room.domain.jpa.Room;
import com.d106.campu.user.domain.jpa.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
@Entity(name = "campsite")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Campsite extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    @Setter
    private String thumbnailImageUrl;

    @Column(name = "map_image_url", length = 1024)
    @Setter
    private String mapImageUrl;

    @Column(name = "homepage", length = 1024)
    private String homepage;

    @Column(name = "sited_stnc")
    private int sitedStnc;

    @Column(name = "animal_cmg_cl", length = 16)
    private String animalCmgCl;

    @Column(name = "hit")
    private long hit;

    @OneToMany(mappedBy = "campsite", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CampsiteImage> campsiteImageList;

    @OneToMany(mappedBy = "campsite", fetch = FetchType.LAZY)
    private List<CampsiteTheme> campsiteThemeList;

    @OneToOne(mappedBy = "campsite")
    private CampsiteLocation campsiteLocation;

    @OneToMany(mappedBy = "campsite", fetch = FetchType.LAZY)
    private List<CampsiteLike> campsiteLikeList;

    @OneToMany(mappedBy = "campsite", fetch = FetchType.LAZY)
    private List<Room> roomList;

    @Transient
    @Setter
    private boolean like;

    @Transient
    @Setter
    private boolean available;

    public void addCampsiteImage(CampsiteImage campsiteImage) {
        this.campsiteImageList.add(campsiteImage);
        campsiteImage.setCampsite(this);
    }

    public void deleteCampsiteImage(CampsiteImage campsiteImage) {
        this.campsiteImageList.remove(campsiteImage);
        campsiteImage.setCampsite(null);
    }

}
