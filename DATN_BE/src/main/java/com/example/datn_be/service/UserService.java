package com.example.datn_be.service;

import com.example.datn_be.dto.UsersDTO;

import java.util.List;

public interface UserService {
    UsersDTO getUserInfo(Integer userId);

    List<UsersDTO> getAllUsers();
    UsersDTO getUserById(Integer userId);
    UsersDTO createUser(UsersDTO userDto);
    UsersDTO updateUser(Integer userId, UsersDTO userDto);
    void deleteUser(Integer userId);
}
