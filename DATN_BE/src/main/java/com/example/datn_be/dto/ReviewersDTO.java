package com.example.datn_be.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReviewersDTO {

    private Integer reviewerId;
    private Float stars;
    private String contents;
    private Integer productId;
    private Integer productDetailId;
    private Integer userId;
    private List<ReviewerPhotoDTO> reviewerPhoto;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
