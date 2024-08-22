package com.example.datn_be.dto;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BrandsDTO {

    private Integer brandId;
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
