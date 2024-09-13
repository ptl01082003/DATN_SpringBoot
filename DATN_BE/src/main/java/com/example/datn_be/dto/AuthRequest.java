package com.example.datn_be.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private Integer userId;
    private String userName;
    private String password;
    private String fullName;
    private String phone;
    private String email;
}
