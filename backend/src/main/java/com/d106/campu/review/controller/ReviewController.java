package com.d106.campu.review.controller;

import com.d106.campu.common.response.Response;
import com.d106.campu.review.constant.ReviewConstant;
import com.d106.campu.review.controller.doc.ReviewControllerDoc;
import com.d106.campu.review.dto.ReviewDto;
import com.d106.campu.review.service.ReviewService;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/review")
@RequiredArgsConstructor
@RestController
public class ReviewController implements ReviewControllerDoc {

    private final ReviewService reviewService;
    private final UserService userService;

    @Override
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response create(@RequestPart(required = false) List<MultipartFile> files,
        @RequestPart ReviewDto.CreateRequest createRequestDto) {
        reviewService.create(files, createRequestDto);
        return new Response();
    }

    @Override
    @GetMapping("/campsite/score/{campsiteId}")
    public Response getCampsiteScore(@PathVariable Long campsiteId) {
        return new Response(ReviewConstant.CAMPSITE_SCORE, reviewService.getCampsiteScore(campsiteId));
    }

    @Override
    @GetMapping("/campsite/{reviewId}/detail")
    public Response getReviewDetail(@PathVariable Long reviewId, HttpServletRequest request) {
        User user = userService.getUserFromToken(request);
        return new Response(ReviewConstant.REVIEW_DETAIL, reviewService.getReviewDetail(reviewId, user));
    }

    @Override
    @GetMapping("/campsite/{campsiteId}")
    public Response getReviewList(@PathVariable Long campsiteId, Pageable pageable) {
        return new Response(ReviewConstant.REVIEW_LIST, reviewService.getReviewList(campsiteId, pageable));
    }

    @Override
    @DeleteMapping("/{reviewId}")
    public Response delete(@PathVariable Long reviewId) {
        reviewService.delete(reviewId);
        return new Response();
    }

}
