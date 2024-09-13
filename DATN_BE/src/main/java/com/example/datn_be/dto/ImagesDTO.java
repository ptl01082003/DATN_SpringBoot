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
public class ImagesDTO {

    private Integer imageId;
    private String path;
    private Integer productId;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
