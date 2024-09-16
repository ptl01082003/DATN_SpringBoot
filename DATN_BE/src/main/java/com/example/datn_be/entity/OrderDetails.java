package com.example.datn_be.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "order_details")
@EntityListeners(AuditingEntityListener.class)
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
    private Integer totals;

    @Column(name = "orderCode",nullable = false, unique = true)
    private String orderCode;

    @Column(name = "amount", precision = 16, scale = 2)
    private BigDecimal amount;

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "address",length = 500)
    private String address;


    @Column(name = "revenue",nullable = false, precision = 16, scale = 2)
    private BigDecimal revenue;

    @Column(name = "transId",nullable = false)
    private String transId;

    @ManyToOne
    @JoinColumn(name = "voucherId")
    private Vouchers vouchers;

    @Column(name = "phone",nullable = false)
    private String phone;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Users users;

    @OneToMany(mappedBy = "orderDetails", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItems> orderItems;


    @Enumerated(EnumType.STRING)
    private REFUND_STATUS refundStatus;

    @Column(name = "refundAmount")
    private Double refundAmount;

    @CreatedDate
    @Column(name = "createdAt", updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updatedAt")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    @PrePersist
    private void generateOrderCode() {
        this.orderCode = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }


}
