package com.example.datn_be.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String userName;
    private String password;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}