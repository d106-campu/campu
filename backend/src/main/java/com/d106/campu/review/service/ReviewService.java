package com.d106.campu.review.service;

import com.d106.campu.review.dto.ReviewDto;
import com.d106.campu.review.mapper.ReviewMapper;
import com.d106.campu.review.repository.jpa.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    @Transactional
    public double getCampsiteScore(Long campsiteId) {
        return reviewRepository.getCampsiteScore(campsiteId);
    }

    @Transactional
    public Page<ReviewDto.Response> getReviewList(Long campsiteId, Pageable pageable) {
        return reviewRepository.findByCampsite_IdOrderByCreateTimeDesc(campsiteId, pageable).map(reviewMapper::toReviewDto);
    }

}
