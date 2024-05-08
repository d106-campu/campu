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

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Notification extends BaseTime {

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

    public void setUser(User user) {
        if (this.user != null) {
            this.user.getNotificationList().remove(this);
        }
        this.user = user;
        user.getNotificationList().add(this);
    }

}
