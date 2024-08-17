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
public class CartItemsDTO {

    private Integer cartItemId;
    private Integer cartId;
    private Integer productDetailId;
    private Integer quantity;
    private BigDecimal price;

    // Getters and Setters
}
