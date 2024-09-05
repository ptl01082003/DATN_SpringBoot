package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.UsersDTO;
import com.example.datn_be.entity.Users;
import com.example.datn_be.respository.UsersRepository;
import com.example.datn_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public UsersDTO getUserInfo(Integer userId) {
        Users user = usersRepository.findByUserId(userId);
        if (user == null) {
            return null;
        }
        UsersDTO userDto = new UsersDTO();
        userDto.setUserId(user.getUserId());
        userDto.setUserName(user.getUserName());
        userDto.setEmail(user.getEmail());
        userDto.setPhone(user.getPhone());
        userDto.setFullName(user.getFullName());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setUpdatedAt(user.getUpdatedAt());

        userDto.setRoles(user.getRoles() != null ?
                Collections.singletonList(user.getRole()) : Collections.emptyList());

        return userDto;
    }
}
