package com.d106.campu.notification.mapper;

import com.d106.campu.emptynotification.domain.jpa.EmptyNotification;
import com.d106.campu.notification.domain.jpa.Notification;
import com.d106.campu.notification.dto.NotificationDto;
import com.d106.campu.notification.dto.NotificationDto.PublishEventRequest;
import com.d106.campu.notification.event.EmptyRoomEvent;
import java.time.temporal.ChronoUnit;
import java.util.List;
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
                .url(String.join("/", baseUrl, "campsite", emptyRoomEventData.getCampsiteId()))
                .build())
            .toList();
    }

}
