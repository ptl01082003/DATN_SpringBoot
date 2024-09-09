package com.example.datn_be.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;


@Entity
@Table(name = "product_details")

@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@DynamicInsert
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class ProductDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productDetailId;

    @ManyToOne
    @JoinColumn(name = "sizeId", nullable = false)
    private Sizes sizes;

    @ManyToOne
    @JoinColumn(name = "productId",referencedColumnName = "productId", nullable = false)
    @JsonBackReference
    private Products products;

    @Column(name = "sellQuanity",nullable = false)
    private Integer sellQuanity = 0;

    @Column(name = "quantity",nullable = false)
    private Integer quantity;

    @Column(name = "numberStatistics",nullable = false)
    private Integer numberStatistics = 0;

    @CreatedDate
    @Column(name = "createdAt", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;

}
