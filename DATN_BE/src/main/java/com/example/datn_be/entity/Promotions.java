package com.example.datn_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "promotions")
public class Promotions {
    // Định nghĩa enum PROMOTIONS_STATUS
    public enum PROMOTIONS_STATUS {
        PRE_START,
        ACTIVE,
        EXPIRED
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer promotionId;

    @Column(precision = 16, scale = 2, nullable = false)
    private BigDecimal discountPrice;

    @Column
    private LocalDate startDay;

    @Column
    private LocalDate endDay;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PROMOTIONS_STATUS status = PROMOTIONS_STATUS.PRE_START;

    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    private Products products;


}
