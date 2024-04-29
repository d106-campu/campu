package com.d106.campu.user.repository;

import com.d106.campu.user.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByAccount(String account);

}
