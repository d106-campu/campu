package com.d106.campu.review.repository.jpa;

import com.d106.campu.review.domain.jpa.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewCustomRepository {

}
