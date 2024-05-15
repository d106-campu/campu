package com.d106.campu.room.repository.jpa;

import com.d106.campu.room.domain.jpa.Induty;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IndutyRepository extends JpaRepository<Induty, Long> {

    Optional<Induty> findByIndutyStr(String induty);

}
