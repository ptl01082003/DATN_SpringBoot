package com.example.datn_be.service.Impl;
import com.example.datn_be.dto.PromotionsDTO;
import com.example.datn_be.entity.Promotions;
import com.example.datn_be.respository.PromotionsRepository;
import com.example.datn_be.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private PromotionsRepository promotionRepository;

    @Override
    public PromotionsDTO getPromotionById(Integer id) {
        Promotions promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promotion not found"));
        return mapToDTO(promotion);
    }

    @Override
    public List<PromotionsDTO> getAllPromotions() {
        return promotionRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PromotionsDTO createPromotion(PromotionsDTO promotionsDTO) {

        Promotions promotion = new Promotions();
        promotion.setDiscountPrice(promotionsDTO.getDiscountPrice());
        promotion.setStartDay(promotionsDTO.getStartDay());
        promotion.setEndDay(promotionsDTO.getEndDay());
        promotion.setStatus(promotionsDTO.getStatus());



        Promotions savedPromotion = promotionRepository.save(promotion);


        return mapToDTO(savedPromotion);
    }

    @Override
    public PromotionsDTO updatePromotion(Integer id, PromotionsDTO promotionsDTO) {
        Promotions existingPromotion = promotionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promotion not found"));
        existingPromotion.setDiscountPrice(promotionsDTO.getDiscountPrice());
        existingPromotion.setStartDay(promotionsDTO.getStartDay());
        existingPromotion.setEndDay(promotionsDTO.getEndDay());
        existingPromotion.setStatus(promotionsDTO.getStatus());

        Promotions updatedPromotion = promotionRepository.save(existingPromotion);
        return mapToDTO(updatedPromotion);
    }

    @Override
    public boolean deletePromotion(Integer id) {
        if (!promotionRepository.existsById(id)) {
            throw new RuntimeException("Promotion not found");
        }
        promotionRepository.deleteById(id);
        return true;
    }

    private PromotionsDTO mapToDTO(Promotions promotion) {
        return new PromotionsDTO(
                promotion.getPromotionId(),
                promotion.getDiscountPrice(),
                promotion.getStartDay(),
                promotion.getEndDay(),
                promotion.getStatus(),
                promotion.getProducts() != null ? promotion.getProducts().getProductId() : null,
                promotion.getProducts() != null ? promotion.getProducts().getCreatedAt() : null,
                promotion.getProducts() != null ? promotion.getProducts().getUpdatedAt() : null
        );
    }

    private Promotions mapToEntity(PromotionsDTO promotionsDTO) {
        Promotions promotion = new Promotions();
        promotion.setPromotionId(promotionsDTO.getPromotionId());
        promotion.setDiscountPrice(promotionsDTO.getDiscountPrice());
        promotion.setStartDay(promotionsDTO.getStartDay());
        promotion.setEndDay(promotionsDTO.getEndDay());
        promotion.setStatus(promotionsDTO.getStatus());

        return promotion;
    }
}
