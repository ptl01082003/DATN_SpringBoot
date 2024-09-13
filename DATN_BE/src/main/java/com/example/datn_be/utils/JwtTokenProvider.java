//package com.example.datn_be.utils;
//
//import com.example.datn_be.entity.Users;
//import com.example.datn_be.service.RedisService;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.JwtException;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import java.security.Key;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.Set;
//
//@Slf4j
//@Component
//public class JwtTokenProvider {
//
//    @Value("${app.jwtSecret}")
//    private String jwtSecret;
//
//    @Value("${app.jwtExpirationInMs}")
//    private int jwtExpirationInMs;
//
//    @Value("${app.jwtRefreshSecret}")
//    private String jwtRefreshSecret;
//
//    private final RedisService redisService;
//
//    public JwtTokenProvider(RedisService redisService) {
//        this.redisService = redisService;
//    }
//
//    private Key getKeyForAccessToken() {
//        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
//    }
//
//    private Key getKeyForRefreshToken() {
//        return Keys.hmacShaKeyFor(jwtRefreshSecret.getBytes());
//    }
//
//    public String generateAccessToken(Users user) {
//        Date now = new Date();
//        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
//
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("userId", user.getUserId());
//
//        return Jwts.builder()
//                .setClaims(claims)
//                .setIssuedAt(now)
//                .setExpiration(expiryDate)
//                .signWith(getKeyForAccessToken(), SignatureAlgorithm.HS512)
//                .compact();
//    }
//
//    public String generateRefreshToken(Users user) {
//        Date now = new Date();
//        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs * 2);
//
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("userId", user.getUserId());
//
//        return Jwts.builder()
//                .setClaims(claims)
//                .setIssuedAt(now)
//                .setExpiration(expiryDate)
//                .signWith(getKeyForRefreshToken(), SignatureAlgorithm.HS512)
//                .compact();
//    }
//
//    public boolean validateToken(String token) {
//        try {
//            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
//            log.info("Token is valid.");
//            return true;
//        } catch (Exception e) {
//            log.error("Invalid token: {}", e.getMessage());
//            return false;
//        }
//    }
//
//    public Integer getUserIdFromToken(String token) {
//        try {
//            Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
//            log.info("User ID extracted from token: {}", claims.get("userId"));
//            return (Integer) claims.get("userId");
//        } catch (Exception e) {
//            log.error("Error extracting user ID from token: {}", e.getMessage());
//            return null;
//        }
//    }
//
//    public void saveUserRoles(Users user, Set<String> roles) {
//        redisService.saveUserRoles(user.getUserId(), roles);
//    }
//
//    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//
//    public String encodePassword(String password) {
//        return passwordEncoder.encode(password);
//    }
//
//    public boolean checkPassword(String rawPassword, String encodedPassword) {
//        return passwordEncoder.matches(rawPassword, encodedPassword);
//    }
//
//    public boolean validateRefreshToken(String refreshToken) {
//        try {
//            Jwts.parserBuilder().setSigningKey(getKeyForRefreshToken()).build().parseClaimsJws(refreshToken);
//            return true;
//        } catch (JwtException | IllegalArgumentException ex) {
//            log.error("Invalid refresh JWT token: {}", ex.getMessage());
//            return false;
//        }
//    }
//}


package com.example.datn_be.utils;

import com.example.datn_be.entity.Users;
import com.example.datn_be.service.RedisService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Slf4j
@Component
public class JwtTokenProvider {

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationInMs;

    @Value("${app.jwtRefreshSecret}")
    private String jwtRefreshSecret;

    private final RedisService redisService;

    public JwtTokenProvider(RedisService redisService) {
        this.redisService = redisService;
    }

    private Key getKeyForAccessToken() {
        // Tạo khóa bí mật cho Access Token với kích thước đủ lớn
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    private Key getKeyForRefreshToken() {
        // Tạo khóa bí mật cho Refresh Token với kích thước đủ lớn
        return Keys.hmacShaKeyFor(jwtRefreshSecret.getBytes());
    }

    public String generateAccessToken(Users user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getUserId());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getKeyForAccessToken(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateRefreshToken(Users user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs * 2);

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getUserId());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getKeyForRefreshToken(), SignatureAlgorithm.HS512)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getKeyForAccessToken()).build().parseClaimsJws(token);
            log.info("Token is valid.");
            return true;
        } catch (Exception e) {
            log.error("Invalid token: {}", e.getMessage());
            return false;
        }
    }

    public Integer getUserIdFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(getKeyForAccessToken()).build().parseClaimsJws(token).getBody();
            log.info("User ID extracted from token: {}", claims.get("userId"));
            return (Integer) claims.get("userId");
        } catch (Exception e) {
            log.error("Error extracting user ID from token: {}", e.getMessage());
            return null;
        }
    }

    public void saveUserRoles(Users user, Set<String> roles) {
        redisService.saveUserRoles(user.getUserId(), roles);
    }

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public boolean validateRefreshToken(String refreshToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getKeyForRefreshToken()).build().parseClaimsJws(refreshToken);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            log.error("Invalid refresh JWT token: {}", ex.getMessage());
            return false;
        }
    }
}
