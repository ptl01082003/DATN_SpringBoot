package com.example.datn_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "order_items")
public class OrderItems {
    public enum ORDER_STATUS {
        DA_GIAO, DA_HUY, TRA_HANG, CHO_LAY_HANG, CHO_XAC_NHAN, CHO_GIAO_HANG, CHO_THANH_TOAN, KHONG_DU_SO_LUONG
    }

    public enum RETURN_STATUS {
        PENDING, APPROVED, REJECTED
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderItemId;

    @Column(name = "amount",nullable = false)
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status",nullable = false)
    private ORDER_STATUS status = ORDER_STATUS.CHO_THANH_TOAN;

    @Enumerated(EnumType.STRING)
    @Column(name = "returnStatus",nullable = false)
    private RETURN_STATUS returnStatus;

    @Column(name = "price")
    private Double price;

    @Column(name = "priceDiscount")
    private Double priceDiscount;

    @Column(name = "userId")
    private Integer userId;

    @Column(name = "isReview")
    private Boolean isReview = false;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "productDetailId", nullable = false)
    private ProductDetails productDetails;

    @ManyToOne
    @JoinColumn(name = "orderDetailId", nullable = false)
    private OrderDetails orderDetails;


}
