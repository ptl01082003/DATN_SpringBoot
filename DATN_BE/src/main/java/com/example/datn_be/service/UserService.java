package com.example.datn_be.service;

import com.example.datn_be.dto.UsersDTO;
import com.example.datn_be.entity.Users;

public interface UserService {
    Users register(UsersDTO userDTO);
    Users login(String userName, String password);
    void logout(Integer userId);
    String requestRefreshToken(String refreshToken);
}