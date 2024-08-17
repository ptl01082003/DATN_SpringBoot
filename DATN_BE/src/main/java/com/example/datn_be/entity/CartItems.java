package com.example.datn_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "cart_items")
public class CartItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartItemId;

    @ManyToOne
    @JoinColumn(name = "productDetailId")  // Tên cột giống với tên biến
    private ProductDetails productDetailId;

    @ManyToOne
    @JoinColumn(name = "cartId")  // Tên cột giống với tên biến
    private ShoppingCarts cartId;

    @Column
    private Integer quanity;

    @Column
    private BigDecimal amount;


}
