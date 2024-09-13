package com.example.datn_be.dto;

import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductsDTO {
    private Integer productId;
    private String name;
    private String code;
    private BigDecimal importPrice;
    private BigDecimal price;
    private Boolean status;
    private Integer originId;
    private Integer styleId;
    private Integer materialId;
    private Integer brandId;
    private String description;
    private BigDecimal priceDiscount;
    private List<String> gallery;
    private List<ProductDetailsDTO> productDetails;


}
