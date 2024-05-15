package com.d106.campu.campsite.repository.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.domain.jpa.CampsiteTheme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampsiteThemeRepository extends JpaRepository<CampsiteTheme, Long> {

    void deleteByCampsite(Campsite campsite);

}
