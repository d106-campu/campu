package com.d106.campu.common.security;

import com.d106.campu.auth.constant.AuthConstant;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletResponse;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtManager {

    @Value("${jwt.access-token-key}")
    private String accessTokenKey;

    @Value("${jwt.access-token-validity-in-seconds}")
    private long accessTokenValidityInMilliseconds;

    public Authentication getAuthentication(String token) {
        Claims claims = getClaims(token);

        Collection<? extends GrantedAuthority> authorities =
            Arrays.stream(claims.get(AuthConstant.AUTHORITIES_KEY).toString().split(","))
                .map(SimpleGrantedAuthority::new).toList();

        User principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
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

    public String validateToken(String accessToken, HttpServletResponse servletResponse) {
        try {
            getClaims(accessToken);
            return accessToken;
        } catch (ExpiredJwtException ex) {
            // TODO : refreshToken 으로 accessToken 발급
        }
        return null;
    }

    private Claims getClaims(String accessToken) {
        return Jwts.parser()
            .verifyWith((SecretKey) getKey(accessTokenKey))
            .build()
            .parseSignedClaims(accessToken)
            .getPayload();
    }

}
