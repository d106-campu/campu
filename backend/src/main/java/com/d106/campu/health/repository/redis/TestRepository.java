package com.d106.campu.health.repository.redis;

import com.d106.campu.health.domain.redis.TestHash;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<TestHash, String> {

}
