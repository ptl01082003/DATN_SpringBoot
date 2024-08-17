package com.example.datn_be.service;

import com.example.datn_be.dto.BrandsDTO;
import com.example.datn_be.entity.Brands;

public interface BrandService {
    Brands addBrand(BrandsDTO brandDTO);
    Iterable<Brands> getBrands();
    Brands getById(Integer brandId);
    Brands updateBrand(BrandsDTO brandDTO);
    boolean deleteBrand(Integer brandId);
}
