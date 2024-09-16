package com.example.datn_be.dto;

import lombok.Data;

@Data
public class SoldItemDTO {
    private Long quantitySold;

    public SoldItemDTO(Long quantitySold) {
        this.quantitySold = quantitySold;
    }

    public Long getQuantitySold() {
        return quantitySold;
    }

    public void setQuantitySold(Long quantitySold) {
        this.quantitySold = quantitySold;
    }
}

