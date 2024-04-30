package com.d106.campu.user.repository.jpa;

import com.d106.campu.user.domain.jpa.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByAccount(String account);

    Optional<User> findByNicknameAndDeleteTimeIsNull(String nickname);

    Optional<User> findByTelAndDeleteTimeIsNull(String tel);

}
