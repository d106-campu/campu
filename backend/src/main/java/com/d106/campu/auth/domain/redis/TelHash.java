package com.d106.campu.auth.domain.redis;

import com.d106.campu.auth.constant.AuthConstant;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RedisHash(value = "telHash", timeToLive = AuthConstant.TEL_HASH_LIFE_SEC)
public class TelHash {

    @Id
    private String tel;

    private int count;

    private int authorizationCode;

    public void increaseCountAndSetAuthorizationCode(int authorizationCode) {
        this.count++;
        this.authorizationCode = authorizationCode;
    }

}
