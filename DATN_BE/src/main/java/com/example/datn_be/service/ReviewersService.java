package com.example.datn_be.service;

import com.example.datn_be.dto.ReviewersDTO;

public interface ReviewersService {
    ReviewersDTO createReview(ReviewersDTO reviewersDTO, Integer orderItemId);
}
