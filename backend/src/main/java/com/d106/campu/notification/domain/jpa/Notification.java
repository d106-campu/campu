package com.d106.campu.notification.domain.jpa;

import com.d106.campu.common.jpa.BaseTime;
import com.d106.campu.user.domain.jpa.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Notification extends BaseTime {

    /*  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별번호',
  `user_id` bigint(20) NOT NULL COMMENT '회원 식별번호',
  `content` varchar(100) NOT NULL COMMENT '알림 내용',
  `redirect_url` varchar(1024) DEFAULT NULL COMMENT '리디렉션 주소',
  `create_time` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `update_time` datetime DEFAULT NULL COMMENT '수정 시간',*/

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "content", length = 100, nullable = false)
    private String content;

    @Column(name = "redirect_url", length = 1024)
    private String redirectUrl;

}
