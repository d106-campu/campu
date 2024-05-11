package com.d106.campu.review.mapper;

import com.d106.campu.review.domain.jpa.Review;
import com.d106.campu.review.domain.jpa.ReviewImage;
import com.d106.campu.review.dto.ReviewDto;
import com.d106.campu.review.dto.ReviewDto.Response;
import com.d106.campu.review.dto.ReviewDto.UserResponse;
import com.d106.campu.user.domain.jpa.User;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    String TO_USER = "java(toUserResponse(review.getReservation().getUser()))";
    String TO_REVIEW_IMAGE_LIST = "java(review.getReviewImageList() == null ? null : review.getReviewImageList().stream().map(ReviewImage::getUrl).toList())";

    @Mapping(target = "user", expression = TO_USER)
    @Mapping(target = "reviewImageList", expression = TO_REVIEW_IMAGE_LIST)
    ReviewDto.Response toReviewDto(Review review);

    List<Response> toReviewDto(List<Review> reviewList);

    UserResponse toUserResponse(User user);

    ReviewDto.ReviewImageResponse toReviewImageDto(ReviewImage reviewImage);

}
