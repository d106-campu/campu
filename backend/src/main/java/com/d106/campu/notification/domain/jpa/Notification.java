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
@ToString
public class Notification extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "message", length = 64)
    private String message;

    @Column(name = "name", length = 256)
    private String name;

    @Column(name = "date", length = 64)
    private String date;

    @Column(name = "no", length = 32)
    private String no;

    @Column(name = "url", length = 1024)
    private String url;

    public void setUser(User user) {
        if (this.user != null) {
            this.user.getNotificationList().remove(this);
        }
        this.user = user;
        user.getNotificationList().add(this);
    }

}
