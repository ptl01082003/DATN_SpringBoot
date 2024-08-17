package com.example.datn_be.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    // Getters and Setters
}
