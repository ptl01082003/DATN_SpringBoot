package com.example.datn_be.service.Impl;

import com.example.datn_be.service.RedisService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RedisServiceImpl implements RedisService {

    private static final Logger logger = LoggerFactory.getLogger(RedisServiceImpl.class);
    private final RedisTemplate<String, String> redisTemplate;

    public RedisServiceImpl(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void setValue(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
        logger.debug("Set value in Redis - Key: {}, Value: {}", key, value);
    }

    @Override
    public String getValue(String key) {
        String value = redisTemplate.opsForValue().get(key);
        logger.debug("Get value from Redis - Key: {}, Value: {}", key, value);
        return value;
    }

    @Override
    public void deleteValue(String key) {
        redisTemplate.delete(key);
        logger.debug("Deleted key from Redis - Key: {}", key);
    }

    public void saveUserRoles(Integer userId, Set<String> roles) {
        String key = "roles-" + userId;

        // Xóa khóa cũ nếu tồn tại
        redisTemplate.delete(key);

        try {
            // Chuyển đổi Set<String> thành mảng chuỗi và lưu vào Redis dưới dạng chuỗi
            String rolesString = String.join(",", roles);
            redisTemplate.opsForValue().set(key, rolesString);

            // Ghi lại hoạt động để phục vụ mục đích gỡ lỗi
            logger.debug("Đã lưu vai trò vào Redis - UserId: {}, Roles: {}", userId, roles);
        } catch (Exception e) {
            // Xử lý các ngoại lệ tiềm ẩn, chẳng hạn như vấn đề kết nối Redis
            logger.error("Lưu vai trò vào Redis thất bại - UserId: {}, Roles: {}", userId, roles, e);
            throw new RuntimeException("Lỗi khi lưu vai trò vào Redis", e);
        }
    }

    public Set<String> getUserRoles(Integer userId) {
        String key = "roles-" + userId;
        String rolesString = redisTemplate.opsForValue().get(key);

        if (rolesString != null) {
            return new HashSet<>(Arrays.asList(rolesString.split(",")));
        } else {
            return new HashSet<>();
        }
    }


}