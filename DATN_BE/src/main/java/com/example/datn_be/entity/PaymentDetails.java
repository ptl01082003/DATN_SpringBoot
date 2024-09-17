package com.example.datn_be.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "payment_details")
@EntityListeners(AuditingEntityListener.class)
public class PaymentDetails {
    public enum PAYMENT_PROVIDER {
        CASH, MOMO, VN_PAY
    }

    public enum PAYMENT_STATUS {
        IDLE, ERRORS, SUCCESS, CASH
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentDetailId;

    @ManyToOne
    @JoinColumn(name = "orderDetailId", nullable = false)
    private OrderDetails orderDetails;

    @Enumerated(EnumType.STRING)
    @Column(name = "status",nullable = false)
    private PAYMENT_STATUS status = PAYMENT_STATUS.IDLE;

    @Column(name = "amount",nullable = false, precision = 16, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider",nullable = false)
    private PAYMENT_PROVIDER provider;

    @CreatedDate
    @Column(name = "createdAt", updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updatedAt")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;


}
