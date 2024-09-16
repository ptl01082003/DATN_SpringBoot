package com.example.datn_be.dto;

import lombok.Data;

import java.math.BigDecimal;
@Data

public class TurnoverByMonthDTO {
    private int month;
    private BigDecimal total;

    public TurnoverByMonthDTO(int month, BigDecimal total) {
        this.month = month;
        this.total = total;
    }
}
