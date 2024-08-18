package com.example.datn_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "products")
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;

    @Column(nullable = false)
    private String name;

    @Column(length = 6, nullable = false)
    private String code;

    @Column(precision = 16, scale = 2, nullable = false)
    private BigDecimal importPrice;

    @Column(precision = 16, scale = 2)
    private BigDecimal price;

    @Column(precision = 16, scale = 2)
    private BigDecimal priceDiscount;

    @Column
    private Boolean status;

    @Column
    private Boolean display;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "originId")
    private Origins origin;

    @ManyToOne
    @JoinColumn(name = "styleId")
    private Styles style;

    @ManyToOne
    @JoinColumn(name = "materialId")
    private Materials material;

    @ManyToOne
    @JoinColumn(name = "brandId")
    private Brands brand;

    @OneToMany(mappedBy = "products")
    private List<ProductDetails> productDetails;

//    @OneToMany(mappedBy = "products")
//    private List<Images> gallery;

    @PrePersist
    @PreUpdate
    private void generateProductCode() {
        if (this.code == null || this.code.isEmpty()) {
            this.code = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        }
        if (this.priceDiscount == null) {
            this.priceDiscount = this.price;
        }
    }
}
