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
    private Integer orderItemId;
    private String name;
    private BigDecimal amount;
    private String status;
    private String returnStatus;
    private BigDecimal price;
    private BigDecimal priceDiscount;
    private Integer userId;
    private Boolean isReview;
    private Integer quanity;
    private Integer productDetailId;
    private Integer orderDetailId;
    private String code;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Thêm thuộc tính mới
    private Integer productId;
    private String path;
    private Integer sizeName;
    private Integer quanityLimit;

    // Constructor
    public OrderItemsDTO(Integer orderItemId, BigDecimal amount, String status, String returnStatus, BigDecimal price,
                         BigDecimal priceDiscount, Integer userId, Boolean isReview, Integer quanity,
                         Integer productDetailId, Integer orderDetailId, LocalDateTime createdAt,
                         LocalDateTime updatedAt, Integer productId, String path, Integer sizeName, Integer quanityLimit,String code,String name) {
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
        this.productId = productId;
        this.path = path;
        this.sizeName = sizeName;
        this.quanityLimit = quanityLimit;
        this.code = code;
        this.name = name;
    }


}

