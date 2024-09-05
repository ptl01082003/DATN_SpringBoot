package com.example.datn_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "order_details")
public class OrderDetails {
     public enum REFUND_STATUS {
        PENDING ,
        COMPLETED ,
        FAILED ,
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderDetailId;

    @Column(name = "totals",nullable = false)
    private Double totals;

    @Column(name = "orderCode",nullable = false, unique = true)
    private String orderCode;

    @Column(name = "amount",nullable = false)
    private Double amount;

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "address",length = 500)
    private String address;

    @ManyToOne
    @JoinColumn(name = "voucherId")
    private Vouchers vouchers;

    @Column(name = "phone",nullable = false)
    private String phone;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Users users;

    @OneToMany(mappedBy = "orderDetails")
    private List<OrderItems> orderItems;

    @Enumerated(EnumType.STRING)
    private REFUND_STATUS refundStatus;

    @Column(name = "refundAmount")
    private Double refundAmount;

    @CreationTimestamp
    @Column(name = "createdAt",updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;

    @PrePersist
    private void generateOrderCode() {
        this.orderCode = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }


}
