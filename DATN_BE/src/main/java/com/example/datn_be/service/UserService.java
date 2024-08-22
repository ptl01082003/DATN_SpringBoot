package com.example.datn_be.service;

import com.example.datn_be.dto.UsersDTO;

public interface UserService {
    UsersDTO getUserInfo(Integer userId);
}
