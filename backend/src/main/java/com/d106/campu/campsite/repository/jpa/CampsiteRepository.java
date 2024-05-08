package com.d106.campu.campsite.repository.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.user.domain.jpa.User;
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
            LEFT JOIN FETCH c.campsiteLocation loc
        WHERE c.doNm = :doNm AND c.sigunguNm = :sigunguNm
        """)
    Page<Campsite> findAll(Pageable pageable, @Param("doNm") String doNm, @Param("sigunguNm") String sigunguNm);

    Page<Campsite> findByUser(Pageable pageable, User user);

    @Query("""
        SELECT c
        FROM campsite c
            LEFT JOIN FETCH c.campsiteLocation loc
        WHERE c.doNm = :doNm AND c.sigunguNm = :sigunguNm
            AND (c.indutyList IS NOT NULL) AND (c.indutyList LIKE %:induty%)
        """)
    Page<Campsite> findByIndutyListContaining(
        Pageable pageable, @Param("doNm") String doNm, @Param("sigunguNm") String sigunguNm, @Param("induty") String induty
    );

    @Query("""
        SELECT c
        FROM campsite c
            LEFT JOIN FETCH c.campsiteThemeList ct
            LEFT JOIN FETCH ct.theme t
            LEFT JOIN FETCH c.campsiteLocation loc
        WHERE c.doNm = :doNm AND c.sigunguNm = :sigunguNm
            AND t.theme = :theme
        """)
    Page<Campsite> findByCampsiteThemeList_Theme_Theme(
        Pageable pageable, @Param("doNm") String doNm, @Param("sigunguNm") String sigunguNm, @Param("theme") String theme
    );

}
