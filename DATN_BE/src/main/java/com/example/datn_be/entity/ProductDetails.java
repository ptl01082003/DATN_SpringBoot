package com.example.datn_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "product_details")
public class ProductDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productDetailId;

    @ManyToOne
    @JoinColumn(name = "sizeId", nullable = false)
    private Sizes sizes;

    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    private Products products;

    @Column(nullable = false)
    private Integer sellQuantity = 0;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Integer numberStatistics = 0;


}
