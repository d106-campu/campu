package com.d106.campu.auth.domain.redis;

import com.d106.campu.auth.constant.AuthConstant;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RedisHash(value = "telVerifyHash", timeToLive = AuthConstant.TEL_VERIFY_HASH_LIFE)
public class TelVerifyHash {

    @Id
    private String tel;

    @Setter
    private boolean authCheck;

}
