package com.example.datn_be.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserVouchersDTO {

    private Integer id;
    private Integer userId;
    private Integer voucherId;
    private LocalDate receivedAt;
    private LocalDate usedAt;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
