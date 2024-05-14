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
    
    String TO_CAMPSITE_ID = "java(review.getCampsite().getId())";
    String TO_CAMPSITE_NAME = "java(review.getCampsite().getFacltNm())";
    String TO_USER = "java(toUserResponse(review.getReservation().getUser()))";
    String TO_REVIEW_IMAGE_LIST = "java(review.getReviewImageList() == null ? null : review.getReviewImageList().stream().map(ReviewImage::getUrl).toList())";
    String TO_VISIT_DATE = "java(review.getReservation().getStartDate())";

    @Mapping(target = "user", expression = TO_USER)
    @Mapping(target = "reviewImageList", expression = TO_REVIEW_IMAGE_LIST)
    ReviewDto.Response toReviewDto(Review review);

    @Mapping(target = "campsiteId", expression = TO_CAMPSITE_ID)
    @Mapping(target = "campsiteName", expression = TO_CAMPSITE_NAME)
    @Mapping(target = "indutyList", ignore = true)
    @Mapping(target = "reviewId", source = "id")
    @Mapping(target = "user", expression = TO_USER)
    @Mapping(target = "reviewImageList", expression = TO_REVIEW_IMAGE_LIST)
    @Mapping(target = "visitDate", expression = TO_VISIT_DATE)
    @Mapping(target = "mine", ignore = true)
    ReviewDto.DetailResponse toDetailReviewDto(Review review);

    List<Response> toReviewDto(List<Review> reviewList);

    UserResponse toUserResponse(User user);

    ReviewDto.ReviewImageResponse toReviewImageDto(ReviewImage reviewImage);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "campsite", ignore = true)
    @Mapping(target = "reservation", ignore = true)
    @Mapping(target = "reviewImageList", ignore = true)
    Review toReview(ReviewDto.CreateRequest createRequestDto);

}
