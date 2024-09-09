package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.PromotionsDTO;
import com.example.datn_be.entity.Promotions;

import com.example.datn_be.respository.PromotionsRepository;
import com.example.datn_be.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PromotionServiceImpl implements PromotionService {

    private final com.example.datn_be.respository.PromotionsRepository promotionsRepository;

    @Autowired
    public PromotionServiceImpl(PromotionsRepository promotionsRepository) {
        this.promotionsRepository = promotionsRepository;
    }

    @Override
    public PromotionsDTO createPromotion(PromotionsDTO promotionsDTO) {
        Promotions promotions = dtoToEntity(promotionsDTO);
        Promotions savedPromotion = promotionsRepository.save(promotions);
        return entityToDto(savedPromotion);
    }

    @Override
    public Optional<PromotionsDTO> getPromotionById(Integer promotionId) {
        return promotionsRepository.findById(promotionId)
                .map(this::entityToDto);
    }

    @Override
    public List<PromotionsDTO> getAllPromotions() {
        return promotionsRepository.findAll().stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public PromotionsDTO updatePromotion(Integer promotionId, PromotionsDTO promotionsDTO) {
        if (promotionsRepository.existsById(promotionId)) {
            Promotions promotions = dtoToEntity(promotionsDTO);
            promotions.setPromotionId(promotionId);
            Promotions updatedPromotion = promotionsRepository.save(promotions);
            return entityToDto(updatedPromotion);
        } else {
            throw new IllegalArgumentException("Promotion with ID " + promotionId + " does not exist.");
        }
    }

    @Override
    public boolean deletePromotion(Integer promotionId) {
        if (promotionsRepository.existsById(promotionId)) {
            promotionsRepository.deleteById(promotionId);
        } else {
            throw new IllegalArgumentException("Promotion with ID " + promotionId + " does not exist.");
        }
        return false;
    }

    // Convert DTO to Entity
    private Promotions dtoToEntity(PromotionsDTO dto) {
        Promotions entity = new Promotions();
        entity.setPromotionId(dto.getPromotionId());
        entity.setDiscountPrice(dto.getDiscountPrice());
        entity.setStartDay(dto.getStartDay());
        entity.setEndDay(dto.getEndDay());
        entity.setStatus(dto.getStatus());
        entity.setProductId(dto.getProductId());
        return entity;
    }

    // Convert Entity to DTO
    private PromotionsDTO entityToDto(Promotions entity) {
        PromotionsDTO dto = new PromotionsDTO();
        dto.setPromotionId(entity.getPromotionId());
        dto.setDiscountPrice(entity.getDiscountPrice());
        dto.setStartDay(entity.getStartDay());
        dto.setEndDay(entity.getEndDay());
        dto.setStatus(entity.getStatus());
        dto.setProductId(entity.getProductId());
        return dto;
    }
}
