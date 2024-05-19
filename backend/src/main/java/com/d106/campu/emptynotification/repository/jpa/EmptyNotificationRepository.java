package com.d106.campu.emptynotification.repository.jpa;

import com.d106.campu.emptynotification.domain.jpa.EmptyNotification;
import com.d106.campu.room.domain.jpa.Room;
import com.d106.campu.user.domain.jpa.User;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmptyNotificationRepository extends JpaRepository<EmptyNotification, Long> {

    long countByUser(User user);

    boolean existsByStartDateAndEndDateAndUserAndRoom(LocalDate startDate, LocalDate endDate, User user, Room room);

    List<EmptyNotification> findByUser_Account(String account);

    void deleteByUserAndRoom(User user, Room room);

}
