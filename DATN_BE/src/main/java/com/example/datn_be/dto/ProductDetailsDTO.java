package com.example.datn_be.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductDetailsDTO {

    private Integer productDetailId;
    private Integer sizeId;
    private Integer productId;
    private Integer sellQuanity;
    private Integer quantity;
    private Integer numberStatistics;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
