package com.d106.campu.review.repository.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.reservation.domain.jpa.Reservation;
import com.d106.campu.review.domain.jpa.Review;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewCustomRepository {

    @Query("SELECT AVG(r.score) as avgScore FROM Review r WHERE r.campsite = :campsite")
    Optional<Double> avgScoreByCampsite(@Param("campsite") Campsite campsite);

    boolean existsByReservation(Reservation reservation);

    Page<Review> findByCampsite_IdOrderByCreateTimeDesc(Long campsiteId, Pageable pageable);

    void deleteByIdAndReservation_User_Account(Long reviewId, String account);

}
