package com.d106.campu.campsite.repository.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.domain.jpa.CampsiteLike;
import com.d106.campu.user.domain.jpa.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampsiteLikeRepository extends JpaRepository<CampsiteLike, Long> {

    Optional<CampsiteLike> findByCampsiteAndUser(Campsite campsite, User user);

}
