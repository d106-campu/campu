package com.d106.campu.emptynotification.repository.jpa;

import com.d106.campu.emptynotification.domain.jpa.QEmptyNotification;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Repository
public class QEmptyNotificationRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QEmptyNotification emptyNotification = QEmptyNotification.emptyNotification;

    @Transactional
    public void deleteAllByIdIn(List<Long> emptyRoomNotificationIdList) {
        jpaQueryFactory.delete(emptyNotification)
            .where(emptyNotification.id.in(emptyRoomNotificationIdList))
            .execute();
    }

}
