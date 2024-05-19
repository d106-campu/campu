package com.d106.campu.notification.mapper;

import com.d106.campu.emptynotification.domain.jpa.EmptyNotification;
import com.d106.campu.notification.domain.jpa.Notification;
import com.d106.campu.notification.dto.NotificationDto;
import com.d106.campu.notification.dto.NotificationDto.PublishEventRequest;
import com.d106.campu.notification.event.CancelEvent;
import com.d106.campu.notification.event.EmptyRoomEvent;
import com.d106.campu.notification.event.PaymentEvent;
import com.d106.campu.reservation.domain.jpa.Reservation;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    NotificationDto.SendResponse toSendResponseDto(NotificationDto.SaveResponse saveResponseDto);

    default EmptyRoomEvent toEmptyRoomEventForTest(PublishEventRequest publishEventRequest) {
        return EmptyRoomEvent.builder()
            .data(List.of(EmptyRoomEvent.Data.builder()
                .userId(publishEventRequest.getUserId())
                .campsiteId(publishEventRequest.getCampsiteId())
                .campsiteName(publishEventRequest.getCampsiteName())
                .roomName(publishEventRequest.getRoomName())
                .startDate(publishEventRequest.getStartDate())
                .endDate(publishEventRequest.getEndDate())
                .baseNo(publishEventRequest.getBaseNo())
                .maxNo(publishEventRequest.getMaxNo())
                .build()))
            .build();
    }

    @Mapping(target = "notificationId", source = "id")
    NotificationDto.ListResponse toListResponseDto(Notification notification);

    @Mapping(target = "emptyNotificationId", source = "emptyNotification.id")
    @Mapping(target = "userId", source = "emptyNotification.user.id")
    @Mapping(target = "campsiteId", source = "emptyNotification.room.campsite.id")
    @Mapping(target = "campsiteName", source = "emptyNotification.room.campsite.facltNm")
    @Mapping(target = "roomName", source = "emptyNotification.room.name")
    @Mapping(target = "startDate", source = "emptyNotification.startDate")
    @Mapping(target = "endDate", source = "emptyNotification.endDate")
    @Mapping(target = "baseNo", source = "emptyNotification.room.baseNo")
    @Mapping(target = "maxNo", source = "emptyNotification.room.maxNo")
    EmptyRoomEvent.Data toEmptyRoomEvent(EmptyNotification emptyNotification);

    default EmptyRoomEvent toEmptyRoomEvent(List<EmptyNotification> emptyNotificationList) {
        return EmptyRoomEvent.builder()
            .data(emptyNotificationList.stream()
                .map(this::toEmptyRoomEvent)
                .toList())
            .build();
    }

    default PaymentEvent toPaymentEvent(Reservation reservation) {
        final Long buyerId = reservation.getUser().getId();
        final Long sellerId = reservation.getRoom().getCampsite().getUser().getId();
        return PaymentEvent.builder()
            .data(List.of(
                PaymentEvent.Data.builder()
                    .userId(buyerId)
                    .campsiteName(reservation.getRoom().getCampsite().getFacltNm())
                    .roomName(reservation.getRoom().getName())
                    .startDate(reservation.getStartDate())
                    .endDate(reservation.getEndDate())
                    .headCnt(reservation.getHeadCnt())
                    .price(reservation.getPrice())
                    .build(),
                PaymentEvent.Data.builder()
                    .userId(sellerId)
                    .campsiteName(reservation.getRoom().getCampsite().getFacltNm())
                    .roomName(reservation.getRoom().getName())
                    .startDate(reservation.getStartDate())
                    .endDate(reservation.getEndDate())
                    .headCnt(reservation.getHeadCnt())
                    .price(reservation.getPrice())
                    .build()))
            .build();
    }

    default CancelEvent toCancelEvent(Reservation reservation) {
        final Long buyerId = reservation.getUser().getId();
        final Long sellerId = reservation.getRoom().getCampsite().getUser().getId();
        return CancelEvent.builder()
            .data(List.of(
                CancelEvent.Data.builder()
                    .userId(buyerId)
                    .campsiteName(reservation.getRoom().getCampsite().getFacltNm())
                    .roomName(reservation.getRoom().getName())
                    .startDate(reservation.getStartDate())
                    .endDate(reservation.getEndDate())
                    .headCnt(reservation.getHeadCnt())
                    .price(reservation.getPrice())
                    .build(),
                CancelEvent.Data.builder()
                    .userId(sellerId)
                    .campsiteName(reservation.getRoom().getCampsite().getFacltNm())
                    .roomName(reservation.getRoom().getName())
                    .startDate(reservation.getStartDate())
                    .endDate(reservation.getEndDate())
                    .headCnt(reservation.getHeadCnt())
                    .price(reservation.getPrice())
                    .build()))
            .build();
    }

    @Mapping(target = "notificationId", source = "notification.id")
    @Mapping(target = "tel", source = "notification.user.tel")
    @Mapping(target = "userId", source = "notification.user.id")
    @Mapping(target = "message", source = "notification.message")
    @Mapping(target = "name", source = "notification.name")
    @Mapping(target = "date", source = "notification.date")
    @Mapping(target = "no", source = "notification.no")
    @Mapping(target = "url", source = "notification.url")
    @Mapping(target = "createTime", source = "notification.createTime")
    NotificationDto.SaveResponse toSaveResponseDto(Notification notification);

    List<NotificationDto.SaveResponse> toSaveResponseDtoList(List<Notification> notificationList);

    default List<Notification> fromEmptyRoomEventDataListToNotificationList(String baseUrl,
        List<EmptyRoomEvent.Data> emptyRoomEventDataList) {
        return emptyRoomEventDataList.stream()
            .map(emptyRoomEventData -> Notification.builder()
                .message(emptyRoomEventData.getMessage())
                .name(String.format("%s - %s", emptyRoomEventData.getCampsiteName(), emptyRoomEventData.getRoomName()))
                .date(String.format("%s ~ %s ꞏ %s박", emptyRoomEventData.getStartDate(), emptyRoomEventData.getEndDate(),
                    ChronoUnit.DAYS.between(emptyRoomEventData.getStartDate(), emptyRoomEventData.getEndDate())))
                .no(String.format("기준 %d인 (최대 %d인)", emptyRoomEventData.getBaseNo(), emptyRoomEventData.getMaxNo()))
                .url(StringUtils.join("/", "camps", "/", emptyRoomEventData.getCampsiteId()))
                .build())
            .toList();
    }

    default List<Notification> fromPaymentEventDataListToNotificationList(String baseUrl,
        List<PaymentEvent.Data> paymentEventDataList) {
        return List.of(
            Notification.builder()
                .message(paymentEventDataList.get(0).getMessage())
                .name(String.format("%s - %s", paymentEventDataList.get(0).getCampsiteName(),
                    paymentEventDataList.get(0).getRoomName()))
                .date(String.format("%s ~ %s ꞏ %s박", paymentEventDataList.get(0).getStartDate(),
                    paymentEventDataList.get(0).getEndDate(),
                    ChronoUnit.DAYS.between(paymentEventDataList.get(0).getStartDate(),
                        paymentEventDataList.get(0).getEndDate())))
                .no(String.format("%d인 - %d원", paymentEventDataList.get(0).getHeadCnt(),
                    paymentEventDataList.get(0).getPrice()))
                .url(StringUtils.join("/", "my"))
                .build(),
            Notification.builder()
                .message(paymentEventDataList.get(1).getMessage())
                .name(String.format("%s - %s", paymentEventDataList.get(1).getCampsiteName(),
                    paymentEventDataList.get(1).getRoomName()))
                .date(String.format("%s ~ %s ꞏ %s박", paymentEventDataList.get(1).getStartDate(),
                    paymentEventDataList.get(1).getEndDate(),
                    ChronoUnit.DAYS.between(paymentEventDataList.get(1).getStartDate(),
                        paymentEventDataList.get(1).getEndDate())))
                .no(String.format("%d인 - %d원", paymentEventDataList.get(1).getHeadCnt(),
                    paymentEventDataList.get(1).getPrice()))
                .url(StringUtils.join("/", "owner"))
                .build());
    }

    default List<Notification> fromCancelEventDataListToNotificationList(String baseUrl,
        List<CancelEvent.Data> cancelEventDataList) {
        return List.of(
            Notification.builder()
                .message(cancelEventDataList.get(0).getMessage())
                .name(String.format("%s - %s", cancelEventDataList.get(0).getCampsiteName(),
                    cancelEventDataList.get(0).getRoomName()))
                .date(String.format("%s ~ %s ꞏ %s박", cancelEventDataList.get(0).getStartDate(),
                    cancelEventDataList.get(0).getEndDate(),
                    ChronoUnit.DAYS.between(cancelEventDataList.get(0).getStartDate(),
                        cancelEventDataList.get(0).getEndDate())))
                .no(String.format("%d인 - %d원", cancelEventDataList.get(0).getHeadCnt(),
                    cancelEventDataList.get(0).getPrice()))
                .url(StringUtils.join("/", "my"))
                .build(),
            Notification.builder()
                .message(cancelEventDataList.get(1).getMessage())
                .name(String.format("%s - %s", cancelEventDataList.get(1).getCampsiteName(),
                    cancelEventDataList.get(1).getRoomName()))
                .date(String.format("%s ~ %s ꞏ %s박", cancelEventDataList.get(1).getStartDate(),
                    cancelEventDataList.get(1).getEndDate(),
                    ChronoUnit.DAYS.between(cancelEventDataList.get(1).getStartDate(),
                        cancelEventDataList.get(1).getEndDate())))
                .no(String.format("%d인 - %d원", cancelEventDataList.get(1).getHeadCnt(),
                    cancelEventDataList.get(1).getPrice()))
                .url(StringUtils.join("/", "owner"))
                .build());
    }

}
