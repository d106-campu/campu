package com.d106.campu.campsite.repository.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampsiteRepository extends JpaRepository<Campsite, Long> {

    Optional<Campsite> findByFacltNm(String name);

}
