package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.LoginRequest;
import com.example.datn_be.dto.RegisterRequest;
import com.example.datn_be.dto.TokenResponse;
import com.example.datn_be.entity.Roles;
import com.example.datn_be.entity.Users;
import com.example.datn_be.respository.UsersRepository;

import com.example.datn_be.service.AuthService;
import com.example.datn_be.utils.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public void register(RegisterRequest registerRequest) {
        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
        Users newUser = new Users();
        newUser.setUserName(registerRequest.getUserName());
        newUser.setPassword(encodedPassword);
        newUser.setFullName(registerRequest.getFullName());
        newUser.setPhone(registerRequest.getPhone());
        newUser.setEmail(registerRequest.getEmail());

        Roles defaultRole = new Roles();
        defaultRole.setType(Roles.RoleTypes.USER);
        newUser.setRoles(defaultRole);
        userRepository.save(newUser);
    }

    @Override
    public TokenResponse login(LoginRequest loginRequest) {
        Optional<Users> userOpt = userRepository.findByUserName(loginRequest.getUserName());
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                String accessToken = jwtTokenProvider.generateAccessToken(user);
                String refreshToken = jwtTokenProvider.generateRefreshToken(user);

                // Lưu thông tin vào Redis
                redisTemplate.opsForValue().set("roles-" + user.getUserId(), user.getRole());
                redisTemplate.opsForValue().set("accessToken-" + user.getUserId(), accessToken);
                redisTemplate.opsForValue().set("refreshToken-" + user.getUserId(), refreshToken);

                return new TokenResponse(accessToken, refreshToken, user.getRole());
            } else {
                throw new RuntimeException("Tài khoản hoặc mật khẩu không đúng");
            }
        } else {
            throw new RuntimeException("Tài khoản không tồn tại");
        }
    }

    @Override
    public void logout(Integer userId) {
        redisTemplate.delete("roles-" + userId);
        redisTemplate.delete("accessToken-" + userId);
        redisTemplate.delete("refreshToken-" + userId);
    }

    @Override
    public TokenResponse refreshToken(String refreshToken) {
        if (jwtTokenProvider.validateToken(refreshToken)) {
            Claims claims = jwtTokenProvider.getClaims(refreshToken, jwtTokenProvider.getRefreshSecret());
            Integer userId = Integer.parseInt(claims.getSubject());

            // Lấy thông tin token refresh từ Redis
            String rfTokenInRedis = redisTemplate.opsForValue().get("refreshToken-" + userId);

            if (refreshToken.equals(rfTokenInRedis)) {
                // Lấy người dùng từ repository
                Users user = userRepository.findById(userId).orElseThrow();
                String newAccessToken = jwtTokenProvider.generateAccessToken(user);

                // Cập nhật token mới vào Redis
                redisTemplate.opsForValue().set("accessToken-" + userId, newAccessToken);

                return new TokenResponse(newAccessToken, refreshToken, user.getRole());
            } else {
                throw new RuntimeException("Refresh Token không hợp lệ");
            }
        } else {
            throw new RuntimeException("Hết hạn refresh token vui lòng đăng nhập lại");
        }
    }
}
