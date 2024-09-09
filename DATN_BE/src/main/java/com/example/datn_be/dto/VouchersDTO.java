package com.example.datn_be.dto;

import com.example.datn_be.entity.Vouchers;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VouchersDTO {

    private Integer voucherId;
    private String code;
    private String description;
    private BigDecimal valueOrder;
    private BigDecimal discountMax;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startDay;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endDay;
    private BigDecimal discountValue;
    private Integer quantity;
    private Vouchers.VouchersStatus status;
    private Vouchers.VouchersType typeValue;
    private Vouchers.VoucherRule ruleType;
    private BigDecimal minOrderValue;
    private Integer minOrderCount;
    private Integer maxOrderCount;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
}
