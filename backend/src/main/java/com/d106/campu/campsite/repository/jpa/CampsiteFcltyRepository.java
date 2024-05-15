package com.d106.campu.campsite.repository.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.domain.jpa.CampsiteFclty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampsiteFcltyRepository extends JpaRepository<CampsiteFclty, Long> {

    void deleteByCampsite(Campsite campsite);

}
