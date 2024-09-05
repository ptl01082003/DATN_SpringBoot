package com.example.datn_be.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class UsersDTO {
    private Integer userId;
    private String userName;
    private String email;
    private String phone;
    private String fullName;
    private List<String> roles;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}