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
public class RolesDTO {

    private Integer roleId;
    private String type;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
