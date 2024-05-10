package com.d106.campu.review.service;

import com.d106.campu.review.repository.jpa.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Transactional
    public double getCampsiteScore(Long campsiteId) {
        return reviewRepository.getCampsiteScore(campsiteId);
    }

}

