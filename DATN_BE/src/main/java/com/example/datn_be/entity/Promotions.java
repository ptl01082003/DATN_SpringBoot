package com.example.datn_be.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "promotions")
@EntityListeners(AuditingEntityListener.class)
@DynamicInsert
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Promotions {


    public enum PROMOTIONS_STATUS {
        PRE_START,
        ACTIVE,
        EXPIRED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer promotionId;


    @Column(name = "discountPrice",precision = 16, scale = 2, nullable = false)
    private BigDecimal discountPrice;

    @Column(name = "startDay")
    private LocalDate startDay;


    @Column(name = "endDay")
    private LocalDate endDay;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PROMOTIONS_STATUS status = PROMOTIONS_STATUS.PRE_START;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    private Products products;
}
