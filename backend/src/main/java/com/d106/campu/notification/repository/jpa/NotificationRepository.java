package com.d106.campu.notification.repository.jpa;

import com.d106.campu.notification.domain.jpa.Notification;
import org.springframework.data.repository.CrudRepository;

public interface NotificationRepository extends CrudRepository<Notification, Long> {

}
