package com.example.datn_be.service;

public interface RedisService {
    void setValue(String key, String value);
    String getValue(String key);
    void deleteValue(String key);
}
