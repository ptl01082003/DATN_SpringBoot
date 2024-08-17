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
public class OrderItemsDTO {

    private Integer orderItemId;
    private Integer amount;
    private String status;
    private String returnStatus;
    private BigDecimal price;
    private BigDecimal priceDiscount;
    private Integer userId;
    private Boolean isReview;
    private Integer quantity;
    private Integer productDetailId;
    private Integer orderDetailId;


}
