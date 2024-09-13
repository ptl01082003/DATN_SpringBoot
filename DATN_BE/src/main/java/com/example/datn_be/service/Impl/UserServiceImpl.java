package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.UsersDTO;
import com.example.datn_be.entity.Roles;
import com.example.datn_be.entity.Users;
import com.example.datn_be.respository.UsersRepository;
import com.example.datn_be.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UsersRepository usersRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UsersDTO getUserInfo(Integer userId) {
        log.debug("Fetching user info for userId: {}", userId);

        Users user = usersRepository.findByUserId(userId);
        if (user == null) {
            log.warn("User not found for userId: {}", userId);
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

        // Kiểm tra và xử lý roles
        if (user.getRoles() != null) {
            String roleName = user.getRoles().getName(); // Lấy tên của role đơn lẻ
            userDto.setRoles(Collections.singletonList(roleName));
        } else {
            userDto.setRoles(Collections.emptyList());
        }

        log.debug("User info: {}", userDto);
        return userDto;
    }


    @Override
    public List<UsersDTO> getAllUsers() {
        return usersRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UsersDTO getUserById(Integer userId) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDto(user);
    }

    @Override
    public UsersDTO createUser(UsersDTO userDto) {
        Users user = new Users();
        user.setUserName(userDto.getUserName());
        user.setEmail(userDto.getEmail());
        user.setPhone(userDto.getPhone());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setFullName(userDto.getFullName());
        // Set the default role for the user
        user.setRoles((Roles) userDto.getRoles());
        Users savedUser = usersRepository.save(user);
        return convertToDto(savedUser);
    }

    @Override
    public UsersDTO updateUser(Integer userId, UsersDTO userDto) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setUserName(userDto.getUserName());
        user.setEmail(userDto.getEmail());
        user.setPhone(userDto.getPhone());
        user.setFullName(userDto.getFullName());
        user.setRoles((Roles) userDto.getRoles());
        Users updatedUser = usersRepository.save(user);
        return convertToDto(updatedUser);
    }

    @Override
    public void deleteUser(Integer userId) {
        usersRepository.deleteById(userId);
    }

    private UsersDTO convertToDto(Users user) {
        UsersDTO userDto = new UsersDTO();
        userDto.setUserId(user.getUserId());
        userDto.setUserName(user.getUserName());
        userDto.setEmail(user.getEmail());
        userDto.setPhone(user.getPhone());
        userDto.setFullName(user.getFullName());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setUpdatedAt(user.getUpdatedAt());
        if (user.getRoles() != null) {
            List<String> roleNames = Collections.singletonList(user.getRoles().getName());
            userDto.setRoles(roleNames);
        } else {
            userDto.setRoles(Collections.emptyList());
        }


        log.debug("User roles for userId {}: {}", userDto.getUserId(), userDto.getRoles());

        return userDto;
    }
}