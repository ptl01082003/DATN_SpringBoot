package com.example.datn_be.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;



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
    private BigDecimal priceDiscount;
    private Boolean status;
    private Boolean display;
    private String description;
    private Integer originId;
    private Integer styleId;
    private Integer materialId;
    private Integer brandId;
    private List<ProductDetailsDTO> productDetails;
    private List<ImagesDTO> gallery;

    // Getters and Setters
}
