package com.example.datn_be.dto;

import com.example.datn_be.entity.Roles;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
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
    private String password;
    private LocalDateTime birth;
    private String fullName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<String> roles;


}