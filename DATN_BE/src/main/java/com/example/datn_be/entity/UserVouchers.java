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
    private Users user;

    @ManyToOne
    @JoinColumn(name = "voucherId", nullable = false)
    private Vouchers voucher;

    @Column(name = "received_at")
    private LocalDateTime receivedAt;

    @Column(name = "used_at")
    private LocalDateTime usedAt;

    @Column
    private String status;


}
