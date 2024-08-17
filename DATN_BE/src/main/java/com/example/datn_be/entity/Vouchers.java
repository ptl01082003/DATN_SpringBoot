package com.example.datn_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "vouchers")
public class Vouchers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voucherId")
    private Integer voucherId;

    @Column
    private String code;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "valueOrder", precision = 16, scale = 2)
    private BigDecimal valueOrder;

    @Column(name = "discountMax", precision = 16, scale = 2)
    private BigDecimal discountMax;

    @Column(name = "startDay")
    private LocalDate startDay;

    @Column(name = "endDay")
    private LocalDate endDay;

    @Column(name = "discountValue", precision = 16, scale = 2)
    private BigDecimal discountValue;

    @Column
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    @Column
    private VouchersStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "typeValue")
    private VouchersType typeValue;

    @Column(name = "ruleType")
    private String ruleType;

    @Column(name = "minOrderValue", precision = 16, scale = 2)
    private BigDecimal minOrderValue;

    @Column(name = "minOrderCount")
    private Integer minOrderCount;

    @Column(name = "maxOrderCount")
    private Integer maxOrderCount;

    @OneToMany(mappedBy = "voucher")
    private List<UserVouchers> userVouchers;

    @OneToMany(mappedBy = "voucher")
    private List<OrderDetails> orderDetails;



    // Enum Definitions
    public enum VouchersStatus {
        ISACTIVE,
        EXPIRED,
        UNUSED
    }

    public enum VouchersType {
        MONEY,
        PERCENT
    }
}
