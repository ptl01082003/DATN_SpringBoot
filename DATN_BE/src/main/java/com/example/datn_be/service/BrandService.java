package com.example.datn_be.service;

import com.example.datn_be.dto.BrandsDTO;
import com.example.datn_be.entity.Brands;

import java.util.List;

public interface BrandService {
    Brands addBrand(BrandsDTO brandDTO);
    List<Brands> getBrands();
    Brands getById(Integer brandId);
    Brands updateBrand(BrandsDTO brandDTO);
    boolean deleteBrand(Integer brandId);
}
