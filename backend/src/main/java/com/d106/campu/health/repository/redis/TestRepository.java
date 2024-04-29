package com.d106.campu.health.repository.redis;

import com.d106.campu.health.hash.TestHash;
import org.springframework.data.repository.CrudRepository;

public interface TestRepository extends CrudRepository<TestHash, String> {
}
