package com.example.datn_be.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "code", length = 6, unique = true)
    private String code;

    @Column(name = "importPrice", precision = 16, scale = 2, nullable = false)
    private BigDecimal importPrice;

    @Column(name = "price", precision = 16, scale = 2)
    private BigDecimal price;

    @Column(name = "priceDiscount", precision = 16, scale = 2)
    @ColumnDefault("0.00")
    private BigDecimal priceDiscount;

    @Column(name = "status", nullable = false, columnDefinition = "BOOLEAN DEFAULT true")
    private Boolean status;

    @Column(name = "display", columnDefinition = "BOOLEAN DEFAULT true")
    private Boolean display;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @CreatedDate
    @Column(name = "createdAt", updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updatedAt")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "originId", referencedColumnName = "originId")
    private Origins origins;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "styleId", referencedColumnName = "styleId")
    private Styles styles;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "materialId", referencedColumnName = "materialId")
    private Materials materials;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brandId", referencedColumnName = "brandId")
    private Brands brands;

    @OneToMany(mappedBy = "products", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ProductDetails> productDetails;


    @OneToMany(mappedBy = "products", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Images> gallery;

    @PrePersist
    public void prePersist() {
        if (this.priceDiscount == null) {
            this.priceDiscount = this.price;
        }
        this.code = generateProductCode();
    }

    @PreUpdate
    public void preUpdate() {
        if (this.priceDiscount == null) {
            this.priceDiscount = this.price;
        }
    }

    private String generateProductCode() {
        return java.util.UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }


}
