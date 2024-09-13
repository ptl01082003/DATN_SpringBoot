package com.example.datn_be.controller;

import com.example.datn_be.dto.PromotionsDTO;
import com.example.datn_be.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/promotions")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    // Tạo khuyến mãi mới
    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<?> addPromotion(@RequestBody PromotionsDTO promotionsDTO) {
        try {
            PromotionsDTO createdPromotion = promotionService.createPromotion(promotionsDTO);
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thành công", "data", createdPromotion),
                    HttpStatus.CREATED
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    // Lấy tất cả các khuyến mãi
    @PostMapping("")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<?> getAllPromotions() {
        try {
            List<PromotionsDTO> promotions = promotionService.getAllPromotions();
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thành công", "data", promotions),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    // Lấy khuyến mãi theo ID
    @PostMapping("/getById")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<?> getPromotionById(@RequestBody Map<String, Integer> request) {
        try {
            Integer promotionId = request.get("promotionId");
            Optional<PromotionsDTO> promotion = promotionService.getPromotionById(promotionId);
            if (promotion != null) {
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công", "data", promotion),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        Map.of("message", "Khuyến mãi không tồn tại"),
                        HttpStatus.NOT_FOUND
                );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    // Cập nhật khuyến mãi

    @PostMapping("/edit")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<?> updatePromotion(@RequestBody PromotionsDTO promotionsDTO) {
        try {
            PromotionsDTO updatedPromotion = promotionService.updatePromotion(promotionsDTO.getPromotionId(), promotionsDTO);
            if (updatedPromotion != null) {
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công", "data", updatedPromotion),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        Map.of("message", "Khuyến mãi không tồn tại"),
                        HttpStatus.NOT_FOUND
                );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    // Xóa khuyến mãi
    @PostMapping("/remove")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<Map<String, Object>> deletePromotion(@RequestParam Integer promotionId) {
        if (promotionId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "promotionId không được để trống"));
        }
        try {
            boolean isDeleted = promotionService.deletePromotion(promotionId);
            if (isDeleted) {
                return ResponseEntity.ok(Map.of("message", "Thực hiện thành công"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Khuyến mãi không tồn tại"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Thực hiện thất bại", "error", e.getMessage()));
        }
    }
}
