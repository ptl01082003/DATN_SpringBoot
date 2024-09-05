package com.example.datn_be.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VouchersDTO {

    private Integer voucherId;
    private String code;
    private String description;
    private BigDecimal valueOrder;
    private BigDecimal discountMax;
    private LocalDate startDay;
    private LocalDate endDay;
    private BigDecimal discountValue;
    private Integer quantity;
    private String status;
    private String typeValue;
    private String ruleType;
    private BigDecimal minOrderValue;
    private Integer minOrderCount;
    private Integer maxOrderCount;
    private List<UserVouchersDTO> userVouchers;
    private List<OrderDetailsDTO> orderDetails;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
