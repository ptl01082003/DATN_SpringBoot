package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.BrandsDTO;
import com.example.datn_be.entity.Brands;
import com.example.datn_be.respository.BrandsRepository;
import com.example.datn_be.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandsRepository brandsRepository;

    @Override
    public Brands addBrand(BrandsDTO brandDTO) {
        Brands brand = new Brands();
        brand.setName(brandDTO.getName());
        return brandsRepository.save(brand);
    }

    @Override
    public List<Brands> getBrands() {
        return brandsRepository.findAll();
    }

    @Override
    public Brands getById(Integer brandId) {
        return brandsRepository.findById(brandId).orElse(null);
    }

    @Override
    public Brands updateBrand(BrandsDTO brandDTO) {
        Brands brand = brandsRepository.findById(brandDTO.getBrandid()).orElse(null);
        if (brand != null) {
            brand.setName(brandDTO.getName());
            return brandsRepository.save(brand);
        }
        return null;
    }

    @Override
    public boolean deleteBrand(Integer brandId) {
        if (brandsRepository.existsById(brandId)) {
            brandsRepository.deleteById(brandId);
            return true;
        }
        return false;
    }
}
