package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.UsersDTO;
import com.example.datn_be.entity.Users;
import com.example.datn_be.respository.UsersRepository;
import com.example.datn_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UsersRepository userRepository;
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
        // Chuyển đổi thêm các trường nếu cần
        return userDto;
    }
}

