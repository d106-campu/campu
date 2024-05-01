package com.d106.campu.user.domain.jpa;

import com.d106.campu.common.jpa.BaseTime;
import com.d106.campu.user.constant.GenderType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account", length = 16, unique = true, nullable = false)
    private String account;

    @Column(name = "password", length = 72, nullable = false)
    private String password;

    @Column(name = "nickname", length = 8, unique = true, nullable = false)
    private String nickname;

    @Column(name = "gender", length = 1)
    @Enumerated(EnumType.STRING)
    private GenderType gender;

    @Column(name = "birth_year", length = 4)
    private String birthYear;

    @Column(name = "profile_image_url", length = 1024)
    private String profileImageUrl;

    @Column(name = "tel", length = 16, unique = true, nullable = false)
    private String tel;

    @Column(name = "delete_time")
    private LocalDateTime deleteTime;

}