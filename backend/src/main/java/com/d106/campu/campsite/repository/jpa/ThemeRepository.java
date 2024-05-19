package com.d106.campu.campsite.repository.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.domain.jpa.Theme;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThemeRepository extends JpaRepository<Theme, Long> {

    List<Theme> findByCampsiteThemeList_Campsite(Campsite campsite);

    // TODO : To @Query refactor
    List<Theme> findByThemeStrIn(List<String> themeList);

}
