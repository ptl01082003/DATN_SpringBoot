package com.example.datn_be.service;

import com.example.datn_be.dto.LoginRequest;
import com.example.datn_be.dto.RegisterRequest;
import com.example.datn_be.dto.TokenResponse;
import com.example.datn_be.entity.Users;

public interface AuthService {
    void register(RegisterRequest registerRequest);
    TokenResponse login(LoginRequest loginRequest);
    void logout(Integer userId);
    TokenResponse refreshToken(String refreshToken);
}