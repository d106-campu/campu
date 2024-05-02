package com.d106.campu.campsite.repository.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CampsiteRepository extends JpaRepository<Campsite, Long> {

    Optional<Campsite> findByFacltNm(String name);

    @Query("SELECT c FROM campsite c WHERE (c.indutyList IS NOT NULL) AND (c.indutyList LIKE %?1%)")
    Page<Campsite> findByIndutyListContaining(Pageable pageable, String induty);

    Page<Campsite> findByCampsiteThemeList_Theme_Theme(Pageable pageable, String theme);

}
