package com.d106.campu.review.repository.jpa;

import com.d106.campu.campsite.domain.jpa.QCampsite;
import com.d106.campu.review.domain.jpa.QReview;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ReviewCustomRepositoryImpl implements ReviewCustomRepository {

    private final JPAQueryFactory queryFactory;
    private final QCampsite campsite = QCampsite.campsite;
    private final QReview review = QReview.review;

    @Override
    public double getCampsiteScore(Long campsiteId) {
        Double score = queryFactory.select(review.score.avg())
            .from(review)
            .groupBy(review.campsite)
            .where(review.campsite.id.eq(campsiteId))
            .fetchOne();

        return score == null ? 0.0 : Math.round(score * 10) / 10.0;
    }

}
