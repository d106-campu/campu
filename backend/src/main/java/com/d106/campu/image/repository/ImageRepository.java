package com.d106.campu.image.repository;

import com.d106.campu.campsite.domain.jpa.QCampsiteImage;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Repository
public class ImageRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QCampsiteImage campsiteImage = QCampsiteImage.campsiteImage;

    @Transactional
    public void deleteAllByCampsite_Id(Long campsiteId) {
        jpaQueryFactory.delete(campsiteImage)
            .where(campsiteImage.campsite.id.eq(campsiteId))
            .execute();
    }

}
