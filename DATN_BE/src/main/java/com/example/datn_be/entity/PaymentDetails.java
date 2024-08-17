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
@Table(name = "payment_details")
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
    private OrderDetails orderDetail;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PAYMENT_STATUS status = PAYMENT_STATUS.IDLE;

    @Column(nullable = false)
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PAYMENT_PROVIDER provider;


}
