package com.d106.campu.notification.mapper;

import com.d106.campu.notification.domain.jpa.Notification;
import com.d106.campu.notification.dto.NotificationDto;
import com.d106.campu.notification.dto.NotificationDto.PublishEventRequest;
import com.d106.campu.notification.event.EmptyRoomEvent;
import com.d106.campu.user.domain.jpa.User;
import java.time.temporal.ChronoUnit;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    NotificationDto.SendResponse toSendResponseDto(NotificationDto.SaveResponse saveResponseDto);

    EmptyRoomEvent toTestEvent(PublishEventRequest publishEventRequestDto);

    @Mapping(target = "notificationId", source = "notification.id")
    @Mapping(target = "tel", source = "user.tel")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "message", source = "notification.message")
    @Mapping(target = "name", source = "notification.name")
    @Mapping(target = "date", source = "notification.date")
    @Mapping(target = "no", source = "notification.no")
    @Mapping(target = "url", source = "notification.url")
    @Mapping(target = "createTime", source = "notification.createTime")
    NotificationDto.SaveResponse toSaveResponseDto(User user, Notification notification);

    @Mapping(target = "notificationId", source = "id")
    NotificationDto.ListResponse toListResponseDto(Notification notification);

    default Notification fromEmptyRoomEventToNotification(String baseUrl, EmptyRoomEvent emptyRoomEvent) {
        return Notification.builder()
            .message(emptyRoomEvent.getMessage())
            .name(String.format("%s - %s", emptyRoomEvent.getCampsiteName(), emptyRoomEvent.getRoomName()))
            .date(String.format("%s ~ %s ꞏ %s박", emptyRoomEvent.getStartDate(), emptyRoomEvent.getEndDate(),
                ChronoUnit.DAYS.between(emptyRoomEvent.getStartDate(), emptyRoomEvent.getEndDate())))
            .no(String.format("기준 %d인 (최대 %d인)", emptyRoomEvent.getBaseNo(), emptyRoomEvent.getMaxNo()))
            .url(String.join("/", baseUrl, "campsite", emptyRoomEvent.getCampsiteId()))
            .build();
    }

}
