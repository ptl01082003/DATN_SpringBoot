package com.example.datn_be.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;



@Entity
@Table(name = "product_details")

@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ProductDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productDetailId;

    @ManyToOne
    @JoinColumn(name = "sizeId", nullable = false)
    private Sizes sizes;

    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    @JsonBackReference
    private Products products;

    @Column(name = "sellQuantity",nullable = false)
    private Integer sellQuantity = 0;

    @Column(name = "quantity",nullable = false)
    private Integer quantity;

    @Column(name = "numberStatistics",nullable = false)
    private Integer numberStatistics = 0;
}
