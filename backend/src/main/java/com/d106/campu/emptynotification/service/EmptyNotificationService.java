package com.d106.campu.emptynotification.service;

import com.d106.campu.common.exception.ConflictException;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.exception.TooManyException;
import com.d106.campu.common.util.SecurityHelper;
import com.d106.campu.emptynotification.constant.EmptyNotificationConstant;
import com.d106.campu.emptynotification.domain.jpa.EmptyNotification;
import com.d106.campu.emptynotification.dto.EmptyNotificationDto.CreateRequest;
import com.d106.campu.emptynotification.exception.code.EmptyNotificationExceptionCode;
import com.d106.campu.emptynotification.mapper.EmptyNotificationMapper;
import com.d106.campu.emptynotification.repository.jpa.EmptyNotificationRepository;
import com.d106.campu.room.domain.jpa.Room;
import com.d106.campu.room.exception.code.RoomExceptionCode;
import com.d106.campu.room.repository.jpa.RoomRepository;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.exception.code.UserExceptionCode;
import com.d106.campu.user.repository.jpa.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class EmptyNotificationService {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final EmptyNotificationRepository emptyNotificationRepository;
    private final EmptyNotificationMapper emptyNotificationMapper;
    private final SecurityHelper securityHelper;

    @Transactional
    public void create(CreateRequest createRequestDto) {
        User user = getUserByAccount();
        Room room = roomRepository.findById(createRequestDto.getRoomId())
            .orElseThrow(() -> new NotFoundException(RoomExceptionCode.NOT_FOUND_ROOM));

        checkExistedEmptyNotification(createRequestDto, user, room);
        checkLimitCount(user);

        EmptyNotification emptyNotification = emptyNotificationMapper.toEmptyNotification(createRequestDto);
        emptyNotification.setUserAndRoom(user, room);

        emptyNotificationRepository.save(emptyNotification);
    }

    private void checkLimitCount(User user) {
        long count = emptyNotificationRepository.countByUser(user);
        if (count >= EmptyNotificationConstant.EMPTY_NOTIFICATION_LIMIT) {
            throw new TooManyException(EmptyNotificationExceptionCode.TOO_MANY_REQUEST_EMPTY_NOTIFICATION);
        }
    }

    private void checkExistedEmptyNotification(CreateRequest createRequestDto, User user, Room room) {
        if (emptyNotificationRepository.existsByStartDateAndEndDateAndUserAndRoom(createRequestDto.getStartDate(),
            createRequestDto.getEndDate(), user, room)) {
            throw new ConflictException(EmptyNotificationExceptionCode.CONFLICT_EMPTY_NOTIFICATION);
        }
    }

    private User getUserByAccount() {
        return userRepository.findByAccount(securityHelper.getLoginAccount())
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
    }

}
