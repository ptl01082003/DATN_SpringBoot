package com.example.datn_be.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StylesDTO {

    private Integer styleId;
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
