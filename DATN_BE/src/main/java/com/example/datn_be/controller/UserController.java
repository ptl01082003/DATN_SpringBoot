package com.example.datn_be.controller;

import com.example.datn_be.dto.UsersDTO;
import com.example.datn_be.service.UserService;
import com.example.datn_be.utils.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

//    @PostMapping("/get-info")
//    public ResponseEntity<UsersDTO> getUserInfo(@RequestHeader("Authorization") String token) {
//        // Xử lý logic lấy userId từ token
//        Integer userId = jwtTokenProvider.getUserIdFromToken(token);
//        UsersDTO userInfo = userService.getUserInfo(userId);
//        return ResponseEntity.ok(userInfo);
//    }

    // Lấy tất cả người dùng (POST)
    @PostMapping("/list")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<UsersDTO>> getAllUsers() {
        List<UsersDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Lấy thông tin người dùng theo ID (POST)
    @PostMapping("/get")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UsersDTO> getUserById(@RequestParam Integer id) {
        UsersDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }


    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UsersDTO> createUser(@RequestBody UsersDTO userDto) {
        UsersDTO newUser = userService.createUser(userDto);
        return ResponseEntity.ok(newUser);
    }

    // Cập nhật thông tin người dùng (POST)
    @PostMapping("/update")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UsersDTO> updateUser(@RequestParam Integer id, @RequestBody UsersDTO userDto) {
        UsersDTO updatedUser = userService.updateUser(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    // Xóa người dùng (POST)
    @PostMapping("/delete")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@RequestParam Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
