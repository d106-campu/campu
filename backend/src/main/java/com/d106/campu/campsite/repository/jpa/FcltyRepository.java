package com.d106.campu.campsite.repository.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.domain.jpa.Fclty;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FcltyRepository extends JpaRepository<Fclty, Long> {

    List<Fclty> findByCampsiteFcltyList_Campsite(Campsite campsite);

}
