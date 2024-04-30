package com.d106.campu.campsite.repository.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampsiteRepository extends JpaRepository<Campsite, Long> {

    Page<Campsite> findByIndutyListContaining(Pageable pageable, String induty);

}
