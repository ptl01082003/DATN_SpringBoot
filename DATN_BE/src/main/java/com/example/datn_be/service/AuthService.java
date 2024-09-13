package com.example.datn_be.service;

import com.example.datn_be.dto.AuthRequest;
import com.example.datn_be.utils.ApiResponse;


import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<ApiResponse> register(AuthRequest request);
    ResponseEntity<ApiResponse> loginWeb(AuthRequest request);
    ResponseEntity<ApiResponse> loginDashboard(AuthRequest request);
    ResponseEntity<ApiResponse> logout(Integer userId);
    ResponseEntity<ApiResponse> requestRefreshToken(String refreshToken);
}
