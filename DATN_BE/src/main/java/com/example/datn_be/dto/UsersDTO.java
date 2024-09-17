package com.example.datn_be.dto;

import com.example.datn_be.entity.Roles;
import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birth;
    private String fullName;
    private String status;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
    private String roles;
    private Integer roleId;

}