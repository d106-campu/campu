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

    Optional<Campsite> findByBizrno(String bizrno);

    Optional<Campsite> findByFacltNm(String name);

    @Query("""
        SELECT c
        FROM campsite c
            LEFT JOIN c.campsiteLocation loc
            LEFT JOIN c.roomList r
        WHERE (:doNm IS NULL OR c.doNm = :doNm) AND (:sigunguNm IS NULL OR c.sigunguNm = :sigunguNm)
            AND r.maxNo >= :headCnt
        """)
    Page<Campsite> findAll(Pageable pageable, @Param("doNm") String doNm, @Param("sigunguNm") String sigunguNm,
        @Param("headCnt") int headCnt);

    Page<Campsite> findByUser(Pageable pageable, User user);

    @Query("""
        SELECT c
        FROM campsite c
            LEFT JOIN c.campsiteLocation loc
            LEFT JOIN c.roomList r
        WHERE (:doNm IS NULL OR c.doNm = :doNm) AND (:sigunguNm IS NULL OR c.sigunguNm = :sigunguNm)
            AND (c.indutyList IS NOT NULL) AND (c.indutyList LIKE %:induty%)
            AND r.maxNo >= :headCnt
        """)
    Page<Campsite> findByInduty(
        Pageable pageable, @Param("doNm") String doNm, @Param("sigunguNm") String sigunguNm, @Param("induty") String induty,
        @Param("headCnt") int headCnt
    );

    @Query("""
        SELECT c
        FROM campsite c
            LEFT JOIN c.campsiteLocation loc
            LEFT JOIN c.roomList r
        WHERE (:doNm IS NULL OR c.doNm = :doNm) AND (:sigunguNm IS NULL OR c.sigunguNm = :sigunguNm)
            AND c IN (
                SELECT ct.campsite
                FROM Theme t
                    INNER JOIN t.campsiteThemeList ct
                WHERE t.themeStr = :theme
            )
            AND r.maxNo >= :headCnt
        """)
    Page<Campsite> findByTheme(
        Pageable pageable, @Param("doNm") String doNm, @Param("sigunguNm") String sigunguNm, @Param("theme") String theme,
        @Param("headCnt") int headCnt
    );

}
