//package com.example.datn_be.service.Impl;
//
//import com.example.datn_be.dto.UsersDTO;
//import com.example.datn_be.entity.Users;
//import com.example.datn_be.respository.UsersRepository;
//import com.example.datn_be.service.UserService;
//import jakarta.transaction.Transactional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class UserServiceImpl implements UserService {
//
//    @Autowired
//    private UsersRepository userRepository;
//
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    @Transactional
//    @Override
//    public Users register(UsersDTO userDTO) {
//        // Check if user already exists
//        Optional<Users> existingUser = userRepository.findByUserName(userDTO.getUserName());
//        if (existingUser.isPresent()) {
//            throw new RuntimeException("Username already exists");
//        }
//
//        // Create and save new user
//        Users user = new Users();
//        user.setUserName(userDTO.getUserName());
//        user.setEmail(userDTO.getEmail());
//        user.setPhone(userDTO.getPhone());
//        user.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
//        user.setFullName(userDTO.getFullName());
//        // Set role and other properties if necessary
//
//        return userRepository.save(user);
//    }
//
//    @Override
//    public Users login(String userName, String password) {
//        // Find user by username
//        Optional<Users> userOptional = userRepository.findByUserName(userName);
//        if (!userOptional.isPresent()) {
//            throw new RuntimeException("User not found");
//        }
//
//        Users user = userOptional.get();
//        // Validate password
//        if (bCryptPasswordEncoder.matches(password, user.getPassword())) {
//            // Generate JWT tokens and other logic here if needed
//            return user;
//        } else {
//            throw new RuntimeException("Invalid credentials");
//        }
//    }
//
//    @Override
//    public void logout(Integer userId) {
//        // Handle logout logic, such as invalidating tokens
//    }
//
//    @Override
//    public String requestRefreshToken(String refreshToken) {
//        // Validate and refresh token logic
//        return null;
//    }
//}
