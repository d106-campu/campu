package com.d106.campu.common.security;

import com.d106.campu.auth.constant.AuthConstant;
import com.d106.campu.auth.dto.AuthDto.LoginRequest;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletResponse;
import java.security.Key;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class JwtManager {

    @Value("${jwt.access-token-key}")
    private String accessTokenKey;

    @Value("${jwt.access-token-validity-in-seconds}")
    private long accessTokenValidityInMilliseconds;

    private final AuthenticationManager authenticationManager;

    public Authentication getAuthentication(LoginRequest loginRequestDto) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
            loginRequestDto.getAccount(), loginRequestDto.getPassword());
        return authenticationManager.authenticate(usernamePasswordAuthenticationToken);
    }

    public void createAccessToken(Authentication authentication, HttpServletResponse servletResponse) {
        String accessToken = generateToken(authentication, accessTokenKey, accessTokenValidityInMilliseconds);
        servletResponse.setHeader(AuthConstant.AUTHORIZATION_HEADER, AuthConstant.AUTHORIZATION_PREFIX + accessToken);
    }

    private String generateToken(Authentication authentication, String tokenKey, long time) {
        String role = authentication.getAuthorities().stream()
            .toList().getFirst().getAuthority();

        Key key = getKey(tokenKey);

        long now = (new Date()).getTime();
        Date expiredDate = new Date(now + time * AuthConstant.SECOND_TO_MILLISECOND);

        return Jwts.builder()
            .subject(authentication.getName())
            .issuedAt(new Date())
            .expiration(expiredDate)
            .signWith(key)
            .claim(AuthConstant.AUTHORITIES_KEY, role)
            .expiration(expiredDate)
            .compact();
    }

    private static Key getKey(String tokenKey) {
        byte[] keyBytes = Decoders.BASE64.decode(tokenKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
