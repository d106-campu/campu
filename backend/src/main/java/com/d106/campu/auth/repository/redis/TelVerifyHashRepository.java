package com.d106.campu.auth.repository.redis;

import com.d106.campu.auth.domain.redis.TelVerifyHash;
import org.springframework.data.repository.CrudRepository;

public interface TelVerifyHashRepository extends CrudRepository<TelVerifyHash, String> {

}
