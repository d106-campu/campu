package com.d106.campu.health.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class CampsiteOriginal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "content_id")
    private String contentId;

    @Column(name = "faclt_nm")
    private String facltNm;

    @Column(name = "line_intro")
    private String lineIntro;

    @Column(name = "intro", length = 2048)
    private String intro;

    @Column(name = "allar")
    private Integer allar;

    @Column(name = "insrnc_at", length = 1)
    private Character insrncAt;

    @Column(name = "trsagnt_no")
    private String trsagntNo;

    @Column(name = "bizrno")
    private String bizrno;

    @Column(name = "faclt_div_nm")
    private String facltDivNm;

    @Column(name = "mange_div_nm")
    private String mangeDivNm;

    @Column(name = "mgc_div", length = 128)
    private String mgcDiv;

    @Column(name = "manage_sttus")
    private String manageSttus;

    @Column(name = "hvof_bgnde")
    @Temporal(TemporalType.TIMESTAMP)
    private Date hvofBgnde;

    @Column(name = "hvof_enddle")
    @Temporal(TemporalType.TIMESTAMP)
    private Date hvofEnddle;

    @Column(name = "feature_nm", length = 512)
    private String featureNm;

    @Column(name = "induty", length = 128)
    private String induty;

    @Column(name = "lct_cl", length = 128)
    private String lctCl;

    @Column(name = "do_nm", length = 32)
    private String doNm;

    @Column(name = "sigungu_nm", length = 64)
    private String sigunguNm;

    @Column(name = "zipcode", length = 128)
    private String zipcode;

    @Column(name = "addr1", length = 512)
    private String addr1;

    @Column(name = "addr2", length = 512)
    private String addr2;

    @Column(name = "map_x")
    private Double mapX;

    @Column(name = "map_y")
    private Double mapY;

    @Column(name = "direction", length = 1024)
    private String direction;

    @Column(name = "tel", length = 32)
    private String tel;

    @Column(name = "homepage", length = 1024)
    private String homepage;

    @Column(name = "resve_url", length = 1024)
    private String resveUrl;

    @Column(name = "resve_cl", length = 64)
    private String resveCl;

    @Column(name = "manage_nmpr")
    private Integer manageNmpr;

    @Column(name = "gnrl_site_co")
    private Integer gnrlSiteCo;

    @Column(name = "auto_site_co")
    private Integer autoSiteCo;

    @Column(name = "glamp_site_co")
    private Integer glampSiteCo;

    @Column(name = "carav_site_co")
    private Integer caravSiteCo;

    @Column(name = "indvdl_carav_site_co")
    private Integer indvdlCaravSiteCo;

    @Column(name = "sited_stnc")
    private Integer sitedStnc;

    @Column(name = "site_mg1_width")
    private Integer siteMg1Width;

    @Column(name = "site_mg2_width")
    private Integer siteMg2Width;

    @Column(name = "site_mg3_width")
    private Integer siteMg3Width;

    @Column(name = "site_mg1_vrticl")
    private Integer siteMg1Vrticl;

    @Column(name = "site_mg2_vrticl")
    private Integer siteMg2Vrticl;

    @Column(name = "site_mg3_vrticl")
    private Integer siteMg3Vrticl;

    @Column(name = "site_mg1_co")
    private Integer siteMg1Co;

    @Column(name = "site_mg2_co")
    private Integer siteMg2Co;

    @Column(name = "site_mg3_co")
    private Integer siteMg3Co;

    @Column(name = "site_bottom_cl1")
    private Integer siteBottomCl1;

    @Column(name = "site_bottom_cl2")
    private Integer siteBottomCl2;

    @Column(name = "site_bottom_cl3")
    private Integer siteBottomCl3;

    @Column(name = "site_bottom_cl4")
    private Integer siteBottomCl4;

    @Column(name = "site_bottom_cl5")
    private Integer siteBottomCl5;

    @Column(name = "tooltip", length = 1024)
    private String tooltip;

    @Column(name = "glamp_inner_fclty", length = 512)
    private String glampInnerFclty;

    @Column(name = "carav_inner_fclty", length = 512)
    private String caravInnerFclty;

    @Column(name = "prmisn_de")
    @Temporal(TemporalType.DATE)
    private Date prmisnDe;

    @Column(name = "oper_pd_cl", length = 32)
    private String operPdCl;

    @Column(name = "oper_de_cl", length = 32)
    private String operDeCl;

    @Column(name = "trler_acmpny_at", length = 1)
    private Character trlerAcmpnyAt;

    @Column(name = "carav_acmpny_at", length = 1)
    private Character caravAcmpnyAt;

    @Column(name = "toilet_co")
    private Integer toiletCo;

    @Column(name = "swrm_co")
    private Integer swrmCo;

    @Column(name = "wtrpl_co")
    private Integer wtrplCo;

    @Column(name = "brazier_cl", length = 16)
    private String brazierCl;

    @Column(name = "sbrs_cl", length = 256)
    private String sbrsCl;

    @Column(name = "sbrs_etc", length = 256)
    private String sbrsEtc;

    @Column(name = "posbl_fclty_cl", length = 256)
    private String posblFcltyCl;

    @Column(name = "posbl_fclty_etc", length = 256)
    private String posblFcltyEtc;

    @Column(name = "cltur_event_at", length = 1)
    private Character clturEventAt;

    @Column(name = "cltur_event", length = 128)
    private String clturEvent;

    @Column(name = "exprn_progrm_at", length = 1)
    private Character exprnProgrmAt;

    @Column(name = "exprn_progrm", length = 128)
    private String exprnProgrm;

    @Column(name = "extshr_co")
    private Integer extshrCo;

    @Column(name = "frprvt_wrpp_co")
    private Integer frprvtWrppCo;

    @Column(name = "frprvt_sand_co")
    private Integer frprvtSandCo;

    @Column(name = "fire_sensor_co")
    private Integer fireSensorCo;

    @Column(name = "thema_envrn_cl", length = 128)
    private String themaEnvrnCl;

    @Column(name = "eqpmn_lend_cl", length = 128)
    private String eqpmnLendCl;

    @Column(name = "animal_cmg_cl", length = 16)
    private String animalCmgCl;

    @Column(name = "tour_era_cl", length = 32)
    private String tourEraCl;

    @Column(name = "first_image_url", length = 1024)
    private String firstImageUrl;

    @Column(name = "createdtime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdtime;

    @Column(name = "modifiedtime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date modifiedtime;

}