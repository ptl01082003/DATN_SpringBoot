package com.example.datn_be.dto;

import lombok.*;


@NoArgsConstructor
@Getter
@Setter
@Data
public class OrderCountByMonthDTO {
    private int month;
    private long total;

    public OrderCountByMonthDTO(int month, long total) {
        this.month = month;
        this.total = total;
    }
}