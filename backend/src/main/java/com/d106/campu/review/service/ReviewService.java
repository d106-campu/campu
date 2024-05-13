package com.d106.campu.review.service;

import com.d106.campu.common.exception.ConflictException;
import com.d106.campu.common.exception.InvalidException;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.exception.UnauthorizedException;
import com.d106.campu.common.util.SecurityHelper;
import com.d106.campu.image.service.ImageService;
import com.d106.campu.reservation.domain.jpa.Reservation;
import com.d106.campu.reservation.exception.code.ReservationExceptionCode;
import com.d106.campu.reservation.repository.jpa.ReservationRepository;
import com.d106.campu.review.constant.ReviewConstant;
import com.d106.campu.review.domain.jpa.Review;
import com.d106.campu.review.dto.ReviewDto;
import com.d106.campu.review.dto.ReviewDto.CreateRequest;
import com.d106.campu.review.exception.code.ReviewExceptionCode;
import com.d106.campu.review.mapper.ReviewMapper;
import com.d106.campu.review.repository.jpa.ReviewRepository;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ImageService imageService;
    private final ReservationRepository reservationRepository;
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final SecurityHelper securityHelper;

    @Transactional
    public void create(List<MultipartFile> files, CreateRequest createRequestDto) {
        Reservation reservation = getReservation(createRequestDto.getReservationId());

        checkUser(securityHelper.getLoginAccount(), reservation.getUser().getAccount());
        checkDate(reservation.getEndDate());
        checkExistedReview(reservation);
        checkFileCount(files);

        Review review = reviewMapper.toReview(createRequestDto);
        review.setReservationAndCampsite(reservation);

        reviewRepository.saveAndFlush(review);

        if (files != null && !files.isEmpty()) {
            imageService.uploadReviewImageList(review, files);
        }
    }

    private void checkFileCount(List<MultipartFile> files) {
        if (files == null) {
            return;
        }

        if (files.size() > ReviewConstant.FILE_COUNT_LIMIT) {
            throw new InvalidException(ReviewExceptionCode.FILE_COUNT_LIMIT);
        }
    }

    @Transactional(readOnly = true)
    public ReviewDto.ScoreResponse getCampsiteScore(Long campsiteId) {
        return reviewRepository.getCampsiteScore(campsiteId);
    }

    @Transactional(readOnly = true)
    public Page<ReviewDto.Response> getReviewList(Long campsiteId, Pageable pageable) {
        return reviewRepository.findByCampsite_IdOrderByCreateTimeDesc(campsiteId, pageable).map(reviewMapper::toReviewDto);
    }

    @Transactional
    public void delete(Long reviewId) {
        reviewRepository.deleteByIdAndReservation_User_Account(reviewId, securityHelper.getLoginAccount());
    }

    private void checkExistedReview(Reservation reservation) {
        if (reviewRepository.existsByReservation(reservation)) {
            throw new ConflictException(ReviewExceptionCode.ALREADY_REVIEW);
        }
    }

    private void checkDate(LocalDate endDate) {
        Period period = Period.between(endDate, LocalDate.now());
        if (period.getDays() < 0) {
            throw new ConflictException(ReviewExceptionCode.NOT_END_RESERVATION);
        }
    }

    private void checkUser(String loginUser, String reservationUser) {
        if (!loginUser.equals(reservationUser)) {
            throw new UnauthorizedException(ReservationExceptionCode.USER_NOT_MATCH);
        }
    }

    private Reservation getReservation(Long reservationId) {
        return reservationRepository.findById(reservationId)
            .orElseThrow(() -> new NotFoundException(ReservationExceptionCode.RESERVATION_NOT_FOUND));
    }

}

