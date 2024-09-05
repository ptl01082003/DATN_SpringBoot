package com.example.datn_be.respository;

import com.example.datn_be.entity.Promotions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionsRepository extends JpaRepository<Promotions, Integer> {
    // Tìm tất cả các khuyến mãi của một sản phẩm cụ thể
    List<Promotions> findByProducts_ProductId(Integer productId);
}
