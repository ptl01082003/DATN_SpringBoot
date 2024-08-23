package com.example.datn_be.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "brands")
public class BrandsDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "brandId")
    private Integer brandid;
    @Column(name = "name")
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
