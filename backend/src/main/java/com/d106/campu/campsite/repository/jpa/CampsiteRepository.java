package com.d106.campu.campsite.repository.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CampsiteRepository extends JpaRepository<Campsite, Long> {

    Optional<Campsite> findByFacltNm(String name);

    @Query("""
        SELECT c
        FROM campsite c
            JOIN FETCH c.campsiteLocation cl
        WHERE (c.indutyList IS NOT NULL)
            AND (c.indutyList LIKE %:induty%)
        """)
    Page<Campsite> findByIndutyListContaining(Pageable pageable, @Param("induty") String induty);

    @Query("""
        SELECT c
        FROM campsite c
            JOIN FETCH c.campsiteThemeSet ct
            JOIN FETCH ct.theme t
            JOIN FETCH c.campsiteLocation cl
        WHERE t.theme = :theme
        """)
    Page<Campsite> findByCampsiteThemeList_Theme_Theme(Pageable pageable, @Param("theme") String theme);

}
