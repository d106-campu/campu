package com.d106.campu.review.repository.jpa;

import com.d106.campu.review.dto.ReviewDto;

public interface ReviewCustomRepository {

    ReviewDto.ScoreResponse getCampsiteScore(Long campsiteId);

}
