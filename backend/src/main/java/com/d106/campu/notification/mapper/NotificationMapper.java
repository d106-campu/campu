package com.d106.campu.notification.mapper;

import com.d106.campu.notification.domain.jpa.Notification;
import com.d106.campu.notification.dto.NotificationDto;
import com.d106.campu.notification.dto.NotificationDto.ListResponse;
import com.d106.campu.notification.dto.NotificationDto.PublishEventRequest;
import com.d106.campu.notification.event.TestEvent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "redirectUrl", ignore = true)
    Notification toNotification(NotificationDto.SaveRequest saveRequestDto);

    NotificationDto.SaveRequest fromTestEventToSaveRequestDto(TestEvent testEvent);

    NotificationDto.SendRequest fromTestEventToSendRequestDto(Long notificationId, TestEvent testEvent);

    NotificationDto.SendResponse toSendResponseDto(NotificationDto.SendRequest sendRequestDto);

    TestEvent toTestEvent(PublishEventRequest publishEventRequestDto);

    @Mapping(target = "notificationId", source = "id")
    ListResponse toListResponseDto(Notification notification);

}
