package com.example.datn_be.service;

import java.util.Set;

public interface RedisService {
    void setValue(String key, String value);
    String getValue(String key);
    void deleteValue(String key);

    Set<String> getUserRoles(Integer userId);

    void saveUserRoles(Integer userId, Set<String> roles);
}
