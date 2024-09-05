package com.example.datn_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "shopping_carts")
public class ShoppingCarts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartId;

    @Column(name = "totals",nullable = false)
    private Double totals;

    @Column(name = "amount",nullable = false)
    private Double amount;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Users users;

    @OneToMany(mappedBy = "shoppingCarts")
    private Set<CartItems> cartItems;
}
