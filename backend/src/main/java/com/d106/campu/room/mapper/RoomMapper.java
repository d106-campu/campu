package com.d106.campu.room.mapper;

import com.d106.campu.room.domain.jpa.Room;
import com.d106.campu.room.dto.RoomDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomMapper {

    @Mapping(target = "induty", expression = "java(room.getInduty().getInduty())")
    RoomDto.Response toRoomResponseDto(Room room);

}
