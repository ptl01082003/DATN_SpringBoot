package com.example.datn_be.service;

import com.example.datn_be.dto.PromotionsDTO;

import java.util.List;

public interface PromotionService {
    PromotionsDTO getPromotionById(Integer id);
    List<PromotionsDTO> getAllPromotions();
    PromotionsDTO createPromotion(PromotionsDTO promotionsDTO);
    PromotionsDTO updatePromotion(Integer id, PromotionsDTO promotionsDTO);
    boolean deletePromotion(Integer id);
}
