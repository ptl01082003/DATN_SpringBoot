package com.example.datn_be.dto;

import com.example.datn_be.entity.Promotions;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromotionsDTO {
    private Integer promotionId;
    private BigDecimal discountPrice;
    private LocalDate startDay;
    private LocalDate endDay;
    private Promotions.PROMOTIONS_STATUS status;
    private Integer productId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
