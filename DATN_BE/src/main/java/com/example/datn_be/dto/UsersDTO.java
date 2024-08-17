package com.example.datn_be.dto;

import lombok.*;

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
    private String birth;
    private String fullName;
    private Integer roleId;
}