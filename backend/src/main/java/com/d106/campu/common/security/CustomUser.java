package com.d106.campu.common.security;

import java.util.Collection;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

@Getter
public class CustomUser extends User {

    private final String nickname;
    private final String profileImageUrl;

    public CustomUser(String account, String password, String nickname, String profileImageUrl,
        Collection<? extends GrantedAuthority> authorities) {
        super(account, password, authorities);

        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }

}
