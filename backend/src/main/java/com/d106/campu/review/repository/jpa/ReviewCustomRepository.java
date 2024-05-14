package com.d106.campu.review.repository.jpa;

import com.d106.campu.review.dto.ReviewDto;
import java.util.List;

public interface ReviewCustomRepository {

    ReviewDto.ScoreResponse getCampsiteScore(Long campsiteId);

    List<String> getIndutyList(Long campsiteId);

}
