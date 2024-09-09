package com.example.datn_be.utils;

import com.example.datn_be.entity.Users;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationInMs;

    @Value("${app.jwtRefreshSecret}")
    private String jwtRefreshSecret;

    private Key getKeyForAccessToken() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    private Key getKeyForRefreshToken() {
        return Keys.hmacShaKeyFor(jwtRefreshSecret.getBytes());
    }

    public String generateAccessToken(Users user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(Integer.toString(user.getUserId()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getKeyForAccessToken(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateRefreshToken(Users user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs * 2);

        return Jwts.builder()
                .setSubject(Integer.toString(user.getUserId()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getKeyForRefreshToken(), SignatureAlgorithm.HS512)
                .compact();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getKeyForAccessToken()).build().parseClaimsJws(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            // Log error details if needed
            return false;
        }
    }

    public boolean validateRefreshToken(String refreshToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getKeyForRefreshToken()).build().parseClaimsJws(refreshToken);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            // Log error details if needed
            return false;
        }
    }

    private Claims getClaims(String token, Key key) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

    public Integer getUserIdFromToken(String token) {
        Claims claims = getClaims(token, getKeyForAccessToken());
        return Integer.parseInt(claims.getSubject());
    }

    public Integer getUserIdFromRefreshToken(String token) {
        Claims claims = getClaims(token, getKeyForRefreshToken());
        return Integer.parseInt(claims.getSubject());
    }

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
