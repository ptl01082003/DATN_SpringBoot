package com.example.datn_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId",nullable = false)
    private Integer userId;

    @Column(name = "userName",nullable = false)
    private String userName;

    @Column(name = "email",nullable = false, unique = true)
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "password",nullable = false)
    private String password;

    @Column(name = "birth")
    private LocalDate birth;

    @Column(name = "fullName",nullable = false)
    private String fullName;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roleId")
    private Roles roles;

    public String getRole() {
        return this.roles != null ? this.roles.getType().name() : null;
    }

}
