package com.example.datn_be.service;

import com.example.datn_be.dto.ProductsDTO;
import com.example.datn_be.entity.Products;

import java.util.List;

public interface ProductService {
    Products addProduct(ProductsDTO productDTO);
    List<Products> getProducts();
    Products getProductById(Integer productId);
    Products updateProduct(ProductsDTO productDTO);
    boolean deleteProduct(Integer productId);
    Products getProductDetails(String code);
    List<Products> getDiscountedProducts();
}