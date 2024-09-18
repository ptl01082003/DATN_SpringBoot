package com.example.datn_be.entity;

import com.example.datn_be.utils.LocalDateTimeDeserializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "vouchers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class Vouchers {

    public enum VouchersType {
        PERCENT
    }

    public enum VouchersStatus {
        ISACTIVE,
        EXPIRED,
        UNUSED
    }

    public enum VoucherRule {
        MIN_ORDER_VALUE,
        NEW_ACCOUNT,
        ORDER_COUNT
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voucherId")
    private Integer voucherId;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "valueOrder", precision = 16, scale = 2)
    private BigDecimal valueOrder;

    @Column(name = "discountMax", precision = 16, scale = 2)
    private BigDecimal discountMax;


    @Column(name = "discountValue", precision = 16, scale = 2)
    private BigDecimal discountValue;

    @Column(name = "quantity")
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private VouchersStatus status = VouchersStatus.ISACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(name = "typeValue", nullable = false)
    private VouchersType typeValue = VouchersType.PERCENT;

    @Enumerated(EnumType.STRING)
    @Column(name = "ruleType")
    private VoucherRule ruleType;

    @Column(name = "minOrderValue", precision = 16, scale = 2)
    private BigDecimal minOrderValue;

    @Column(name = "minOrderCount")
    private Integer minOrderCount;

    @Column(name = "maxOrderCount")
    private Integer maxOrderCount;

    @OneToMany(mappedBy = "vouchers", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserVouchers> userVouchers;

    @OneToMany(mappedBy = "vouchers", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<OrderDetails> orderDetails;

    @Column(name = "startDay")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime startDay;

    @Column(name = "endDay")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime endDay;

    @CreatedDate
    @Column(name = "createdAt", updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updatedAt")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;




}
