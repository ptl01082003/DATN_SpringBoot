package com.example.datn_be.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
import java.util.Objects;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "order_items")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class OrderItems {
    public enum ORDER_STATUS {
        DA_GIAO, DA_HUY, TRA_HANG, CHO_LAY_HANG, CHO_XAC_NHAN, CHO_GIAO_HANG, CHO_THANH_TOAN, KHONG_DU_SO_LUONG, KHONG_THANH_CONG,NHAP_KHO;

    }

    public enum RETURN_STATUS {
        PENDING, APPROVED, REJECTED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderItemId;

    @Column(name = "amount", nullable = false, precision = 16, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ORDER_STATUS status = ORDER_STATUS.CHO_THANH_TOAN;

    @Enumerated(EnumType.STRING)
    @Column(name = "returnStatus")
    private RETURN_STATUS returnStatus;

    @Column(name = "price", precision = 16, scale = 2)
    private BigDecimal price;

    @Column(name = "priceDiscount", precision = 16, scale = 2)
    private BigDecimal priceDiscount;

    @Column(name = "userId")
    private Integer userId;

    @Column(name = "isReview")
    private Boolean isReview = false;

    @Column(name = "quanity")
    private Integer quanity;

    @ManyToOne
    @JoinColumn(name = "productDetailId", nullable = false)
    private ProductDetails productDetails;

    @ManyToOne
    @JoinColumn(name = "orderDetailId", nullable = false)
    private OrderDetails orderDetails;

    @CreatedDate
    @Column(name = "createdAt", updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updatedAt")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;


}
