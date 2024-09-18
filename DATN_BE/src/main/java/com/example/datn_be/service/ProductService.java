package com.example.datn_be.service;

import com.example.datn_be.dto.ProductsDTO;
import com.example.datn_be.entity.Products;

import java.util.List;
import java.util.Map;

public interface ProductService {
    Products addProduct(ProductsDTO productDTO);
    List<Products> getProducts();
    Products getProductDetails(String code);
    List<Products> getLstProducts(Map<String, Object> request);
    Products updateProduct(ProductsDTO productDTO);
    boolean deleteProduct(Integer productId);
    List<Products> getDiscountedProducts();
    void updateProductStatus(Integer productId, boolean status);
}
