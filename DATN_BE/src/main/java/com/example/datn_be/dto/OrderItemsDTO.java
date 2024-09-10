package com.example.datn_be.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@NoArgsConstructor
@Getter
@Setter
public class OrderItemsDTO {

//    private Integer orderItemId;
//    private Integer amount;
//    private String status;
//    private String returnStatus;
//    private BigDecimal price;
//    private BigDecimal priceDiscount;
//    private Integer userId;
//    private Boolean isReview;
//    private Integer quantity;
//    private Integer productDetailId;
//    private Integer orderDetailId;
//    private LocalDateTime createdAt;
//    private LocalDateTime updatedAt;

    private Integer orderItemId;
    private int amount;
    private String status;
    private String returnStatus;
    private BigDecimal price;
    private BigDecimal priceDiscount;
    private Integer userId;
    private Boolean isReview;
    private Integer quanity;
    private Integer productDetailId;
    private Integer orderDetailId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructor
    public OrderItemsDTO(Integer orderItemId, int amount, String status, String returnStatus, BigDecimal price,
                         BigDecimal priceDiscount, Integer userId, Boolean isReview, Integer quanity,
                         Integer productDetailId, Integer orderDetailId, LocalDateTime createdAt,
                         LocalDateTime updatedAt) {
        this.orderItemId = orderItemId;
        this.amount = amount;
        this.status = status;
        this.returnStatus = returnStatus;
        this.price = price;
        this.priceDiscount = priceDiscount;
        this.userId = userId;
        this.isReview = isReview;
        this.quanity = quanity;
        this.productDetailId = productDetailId;
        this.orderDetailId = orderDetailId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }



}
