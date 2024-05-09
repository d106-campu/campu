package com.d106.campu.emptynotification.mapper;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.emptynotification.domain.jpa.EmptyNotification;
import com.d106.campu.mypage.dto.MyPageDto.CampsiteResponse;
import com.d106.campu.mypage.dto.MyPageDto.EmptyNotificationRoomResponse;
import com.d106.campu.mypage.dto.MyPageDto.MyEmptyNotificationResponse;
import com.d106.campu.room.domain.jpa.Room;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EmptyNotificationMapper {

    @Mapping(target = "emptyNotificationId", source = "id")
    MyEmptyNotificationResponse toMyEmptyNotificationResponseDto(EmptyNotification emptyNotification);

    List<MyEmptyNotificationResponse> toMyEmptyNotificationResponseDto(List<EmptyNotification> emptyNotificationList);

    @Mapping(target = "roomName", source = "name")
    EmptyNotificationRoomResponse toEmptyNotificationRoomResponseDto(Room room);

    @Mapping(target = "campsiteId", source = "id")
    @Mapping(target = "campsiteName", source = "facltNm")
    @Mapping(target = "address", source = "addr1")
    CampsiteResponse toCampsiteResponseDto(Campsite campsite);

}
