package com.example.datn_be.dto;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class MaterialsDTO {

    private Integer materialId;
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
