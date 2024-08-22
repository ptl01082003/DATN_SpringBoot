package com.example.datn_be.controller;

import com.example.datn_be.dto.UsersDTO;
import com.example.datn_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/get-info")
    public ResponseEntity<Map<String, Object>> getInfo(@RequestParam Integer userId) {
        try {
            UsersDTO userDto = userService.getUserInfo(userId);
            if (userDto == null) {
                return ResponseEntity.status(404).body(Map.of(
                        "message", "Người dùng không tồn tại",
                        "code", 1
                ));
            }
            return ResponseEntity.ok(Map.of(
                    "message", "Thực hiện thành công",
                    "code", 0,
                    "data", userDto
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "message", "Có lỗi xảy ra",
                    "code", 2,
                    "error", e.getMessage()
            ));
        }
    }
}
