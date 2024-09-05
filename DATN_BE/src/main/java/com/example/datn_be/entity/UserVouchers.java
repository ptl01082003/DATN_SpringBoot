package com.example.datn_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "user_vouchers")
public class UserVouchers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Users users;

    @ManyToOne
    @JoinColumn(name = "voucherId", nullable = false)
    private Vouchers vouchers;

    @Column(name = "receivedAt")
    private LocalDateTime receivedAt;

    @Column(name = "usedAt")
    private LocalDateTime usedAt;

    @Column(name = "status")
    private String status;


}
