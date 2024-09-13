package com.example.datn_be.dto;

import lombok.Data;
import org.springframework.core.SpringVersion;

@Data
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private Integer userId;
}
