package com.d106.campu.emptynotification.repository.jpa;

import com.d106.campu.emptynotification.domain.jpa.EmptyNotification;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmptyNotificationRepository extends JpaRepository<EmptyNotification, Long> {

    List<EmptyNotification> findByUser_Account(String account);

}
