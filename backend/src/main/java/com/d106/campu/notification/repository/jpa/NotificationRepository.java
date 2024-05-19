package com.d106.campu.notification.repository.jpa;

import com.d106.campu.notification.domain.jpa.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    Page<Notification> findAllByUser_Id(Pageable pageable, Long notificationId);

    boolean existsByIdAndUser_Id(Long notificationId, Long userId);

}
