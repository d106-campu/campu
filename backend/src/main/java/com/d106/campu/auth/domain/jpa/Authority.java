package com.d106.campu.auth.domain.jpa;

import com.d106.campu.auth.constant.AuthorityName;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
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
public class Authority {

    @Id
    @Column(name = "authority_name", length = 16)
    @Enumerated(EnumType.STRING)
    private AuthorityName authorityName;

}
