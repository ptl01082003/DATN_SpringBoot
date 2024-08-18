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
    @JoinColumn(name = "productDetailId", nullable = false)
    private ProductDetails productDetail;

    @ManyToOne
    @JoinColumn(name = "cartId", nullable = false)
    private ShoppingCarts shoppingCart;

    @Column
    private Integer quantity;

    @Column
    private BigDecimal amount;
}
