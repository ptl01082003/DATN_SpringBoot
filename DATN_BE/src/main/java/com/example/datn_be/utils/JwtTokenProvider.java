package com.example.datn_be.utils;

import com.example.datn_be.entity.Users;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationInMs;

    @Value("${app.jwtRefreshSecret}")
    private String jwtRefreshSecret;

    public String generateAccessToken(Users user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(Integer.toString(user.getUserId()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret.getBytes()) // Chuyển đổi secret key thành byte array
                .compact();
    }

    public String generateRefreshToken(Users user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs * 2);

        return Jwts.builder()
                .setSubject(Integer.toString(user.getUserId()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtRefreshSecret.getBytes()) // Chuyển đổi secret key thành byte array
                .compact();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret.getBytes()).parseClaimsJws(authToken); // Chuyển đổi secret key thành byte array
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    public boolean validateRefreshToken(String refreshToken) {
        try {
            Jwts.parser().setSigningKey(jwtRefreshSecret.getBytes()).parseClaimsJws(refreshToken); // Chuyển đổi secret key thành byte array
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    public Claims getClaims(String token, String secretKey) {
        return Jwts.parser()
                .setSigningKey(secretKey.getBytes()) // Chuyển đổi secret key thành byte array
                .parseClaimsJws(token)
                .getBody();
    }

    public Integer getUserIdFromToken(String token) {
        Claims claims = getClaims(token, jwtSecret);
        return Integer.parseInt(claims.getSubject());
    }

    public Integer getUserIdFromRefreshToken(String token) {
        Claims claims = getClaims(token, jwtRefreshSecret);
        return Integer.parseInt(claims.getSubject());
    }

    public String encodePassword(String password) {
        return new BCryptPasswordEncoder().encode(password);
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return new BCryptPasswordEncoder().matches(rawPassword, encodedPassword);
    }
}
