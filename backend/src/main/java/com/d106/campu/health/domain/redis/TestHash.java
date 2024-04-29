package com.d106.campu.health.domain.redis;

import jakarta.persistence.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("test")
public class TestHash {

    @Id
    private String id;

    private String name;

}