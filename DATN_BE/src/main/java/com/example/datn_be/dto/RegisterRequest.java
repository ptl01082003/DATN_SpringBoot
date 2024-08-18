package com.example.datn_be.dto;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String fullName;
    private String password;
    private String phone;
    private String email;
    private String userName;
    private String role;
}