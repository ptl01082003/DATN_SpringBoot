package com.example.datn_be.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDetailsDTO {

    private Integer orderDetailId;
    private BigDecimal totals;
    private String orderCode;
    private BigDecimal amount;
    private String name;
    private String address;
    private Integer voucherId;
    private String phone;
    private Integer userId;
    private String refundStatus;
    private BigDecimal refundAmount;
    private List<OrderItemsDTO> orderItems;

    // Getters and Setters
}
