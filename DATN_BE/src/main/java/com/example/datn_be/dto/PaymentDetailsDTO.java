package com.example.datn_be.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PaymentDetailsDTO {

    private Integer paymentDetailId;
    private Integer orderDetailId;
    private String status;
    private BigDecimal amount;
    private String provider;

}
