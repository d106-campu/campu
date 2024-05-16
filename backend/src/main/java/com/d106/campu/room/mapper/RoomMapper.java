package com.d106.campu.room.mapper;

import com.d106.campu.campsite.constant.IndutyEnum;
import com.d106.campu.owner.dto.OwnerDto;
import com.d106.campu.room.domain.jpa.Room;
import com.d106.campu.room.dto.RoomDto;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", imports = IndutyEnum.class)
public interface RoomMapper {

    @Mapping(target = "induty", expression = "java(room.getInduty().getIndutyStr())")
    @Mapping(target = "emptyNotification", ignore = true)
    @Mapping(target = "totalPrice", ignore = true)
    RoomDto.Response toRoomResponseDto(Room room);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "campsite", ignore = true)
    @Mapping(target = "induty", ignore = true)
    @Mapping(target = "name", source = "roomName")
    @Mapping(target = "imageUrl", ignore = true)
    @Mapping(target = "roomCnt", ignore = true)
    @Mapping(target = "supplyList", ignore = true)
    @Mapping(target = "reservationList", ignore = true)
    @Mapping(target = "emptyNotificationList", ignore = true)
    @Mapping(target = "available", ignore = true)
    @Mapping(target = "toiletCnt", expression = "java(roomCreateRequestDto.isToilet() == true ? 1 : 0)")
    Room toRoom(OwnerDto.RoomCreateRequest roomCreateRequestDto);

    @Mapping(target = "roomId", source = "id")
    @Mapping(target = "induty", expression = "java(IndutyEnum.of(room.getInduty().getIndutyStr()))")
    @Mapping(target = "roomName", source = "name")
    @Mapping(target = "toilet", expression = "java(room.getToiletCnt() > 0 ? true : false)")
    OwnerDto.RoomResponse toOwnerRoomResponse(Room room);

    List<OwnerDto.RoomResponse> toOwnerRoomResponse(List<Room> roomList);

}
