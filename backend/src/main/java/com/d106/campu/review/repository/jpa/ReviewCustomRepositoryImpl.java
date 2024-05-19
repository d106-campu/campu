package com.d106.campu.review.repository.jpa;

import com.d106.campu.campsite.domain.jpa.QCampsite;
import com.d106.campu.review.domain.jpa.QReview;
import com.d106.campu.review.dto.ReviewDto;
import com.d106.campu.room.domain.jpa.QInduty;
import com.d106.campu.room.domain.jpa.QRoom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ReviewCustomRepositoryImpl implements ReviewCustomRepository {

    private final JPAQueryFactory queryFactory;
    private final QCampsite campsite = QCampsite.campsite;
    private final QReview review = QReview.review;
    private final QRoom room = QRoom.room;
    private final QInduty induty = QInduty.induty;

    @Override
    public ReviewDto.ScoreResponse getCampsiteScore(Long campsiteId) {
        return ReviewDto.ScoreResponse.builder()
            .campsiteName(getCampsiteName(campsiteId))
            .indutyList(getIndutyList(campsiteId))
            .score(getScore(campsiteId))
            .build();
    }

    public String getCampsiteName(Long campsiteId) {
        return queryFactory.select(campsite.facltNm)
            .from(campsite)
            .where(campsite.id.eq(campsiteId))
            .fetchOne();
    }

    public double getScore(Long campsiteId) {
        Double score = queryFactory.select(review.score.avg())
            .from(review)
            .where(review.campsite.id.eq(campsiteId))
            .fetchOne();

        return score == null ? 0.0 : Math.round(score * 10) / 10.0;
    }

    public List<String> getIndutyList(Long campsiteId) {
        List<String> temp = queryFactory.select(induty.indutyStr)
            .from(room).join(induty).on(room.induty.eq(induty))
            .where(room.campsite.id.eq(campsiteId))
            .fetch();

        return List.copyOf(Set.copyOf(temp));
    }

}
