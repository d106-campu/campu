package com.d106.campu.mypage.dto;

import com.d106.campu.common.annotation.Password;
import com.d106.campu.user.constant.GenderType;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

public class MyPageDto {

    @Builder
    @Getter
    public static class MyReservationResponse {

        private CampsiteResponse campsite;
        private RoomResponse room;
        private ReservationResponse reservation;
        private CampsiteLocationResponse campsiteLocation;
    }

    @Builder
    @Getter
    public static class CampsiteResponse {

        private Long campsiteId;
        private String campsiteName;
        private String address;
        private String thumbnailImageUrl;
        private String tel;
        private String checkin;
        private String checkout;
    }

    @Builder
    @Getter
    public static class RoomResponse {

        private Long roomId;
        private String induty;
        private String roomName;
        private String supplyList;
    }

    @Builder
    @Getter
    public static class ReservationResponse {

        private Long reservationId;
        private String impUid;
        private Integer headCnt;
        private Long price;
        private LocalDate startDate;
        private LocalDate endDate;
        private String status;
    }

    @Builder
    @Getter
    public static class CampsiteLocationResponse {

        private Double mapX;
        private Double mapY;
    }

    @Builder
    @Getter
    public static class MyReviewResponse {

        private ReviewResponse review;
        private ReviewReservationResponse reservation;
    }

    @Builder
    @Getter
    public static class ReviewResponse {

        private Long reviewId;
        private Integer score;
        private String content;
        private LocalDateTime createTime;
        private String imageUrl;
    }

    @Builder
    @Getter
    public static class ReviewReservationResponse {

        private Long campsiteId;
        private String campsiteName;
        private String roomName;
    }

    @Builder
    @Getter
    public static class MyCampsiteResponse {

        private Long campsiteId;
        private String campsiteName;
        private String thumbnailImageUrl;
        private String lineIntro;
        private String address;
        private Long minPrice;
        private Double score;
    }

    @Builder
    @Getter
    public static class MyEmptyNotificationResponse {

        private Long emptyNotificationId;
        private LocalDate startDate;
        private LocalDate endDate;
        private EmptyNotificationRoomResponse room;
    }

    @Builder
    @Getter
    public static class EmptyNotificationRoomResponse {

        private Long roomId;
        private String roomName;
        private CampsiteResponse campsite;
    }

    @Data
    public static class PasswordChangeRequest {

        @Password
        private String currentPassword;

        @Password
        private String newPassword;

        @Password
        private String newPasswordCheck;
    }

    @Data
    public static class EtcInfoChangeRequest {

        private GenderType gender;
        private String birthYear;
    }

}
