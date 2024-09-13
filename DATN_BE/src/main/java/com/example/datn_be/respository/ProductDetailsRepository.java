package com.example.datn_be.respository;

import com.example.datn_be.entity.ProductDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDetailsRepository extends JpaRepository<ProductDetails, Integer> {
    ProductDetails findByProducts_ProductIdAndSizes_SizeId(Integer productId, Integer sizeId);
    void deleteByProducts_ProductId(Integer productId);
}
