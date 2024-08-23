package com.example.datn_be.dto;

<<<<<<< HEAD
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
=======
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
>>>>>>> 553a3e759a1552922d14919ea5496c8988f6af87
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
