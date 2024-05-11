package com.d106.campu.review.controller;

import com.d106.campu.common.response.Response;
import com.d106.campu.review.constant.ReviewConstant;
import com.d106.campu.review.controller.doc.ReviewControllerDoc;
import com.d106.campu.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/review")
@RequiredArgsConstructor
@RestController
public class ReviewController implements ReviewControllerDoc {

    private final ReviewService reviewService;

    @Override
    @GetMapping("/campsite/score/{campsiteId}")
    public Response getCampsiteScore(@PathVariable Long campsiteId) {
        return new Response(ReviewConstant.CAMPSITE_SCORE, reviewService.getCampsiteScore(campsiteId));
    }

    @Override
    @GetMapping("/campsite/{campsiteId}")
    public Response getReviewList(@PathVariable Long campsiteId, Pageable pageable) {
        return new Response(ReviewConstant.REVIEW_LIST, reviewService.getReviewList(campsiteId, pageable));
    }

}
