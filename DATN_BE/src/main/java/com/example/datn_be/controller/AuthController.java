package com.example.datn_be.controller;

import com.example.datn_be.dto.AuthRequest;
import com.example.datn_be.dto.AuthResponse;
import com.example.datn_be.service.AuthService;
import com.example.datn_be.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody AuthRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> loginWeb(@RequestBody AuthRequest request) {
        return authService.loginWeb(request);
    }

    @PostMapping("/login-dashboard")
    public ResponseEntity<ApiResponse> loginDashboard(@RequestBody AuthRequest request) {
        return authService.loginDashboard(request);

    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(@RequestParam Integer userId) {
        return authService.logout(userId);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse> requestRefreshToken(@RequestParam String refreshToken) {
        return authService.requestRefreshToken(refreshToken);
    }
}
