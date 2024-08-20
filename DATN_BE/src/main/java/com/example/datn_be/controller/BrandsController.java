package com.example.datn_be.controller;


import com.example.datn_be.dto.BrandsDTO;
import com.example.datn_be.entity.Brands;
import com.example.datn_be.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/brands")
public class BrandsController {

    @Autowired
    private BrandService brandService;

    @PostMapping("/add")
    public ResponseEntity<?> addBrand(@RequestBody BrandsDTO brandDTO) {
        try {
            Brands brand = brandService.addBrand(brandDTO);
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thành công", "data", brand),
                    HttpStatus.CREATED
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getBrands() {
        try {
            List<Brands> brands = brandService.getBrands();
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thành công", "data", brands),
                    HttpStatus.OK

            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @GetMapping("/{brandId}")
    public ResponseEntity<?> getById(@PathVariable Integer brandId) {
        try {
            Brands brand = brandService.getById(brandId);
            if (brand != null) {
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công", "data", brand),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        Map.of("message", "Thương hiệu không tồn tại"),
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

    @PutMapping("/update")
    public ResponseEntity<?> updateBrand(@RequestBody BrandsDTO brandDTO) {
        try {
            Brands updatedBrand = brandService.updateBrand(brandDTO);
            if (updatedBrand != null) {
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công", "data", updatedBrand),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        Map.of("message", "Thương hiệu không tồn tại"),
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

    @DeleteMapping("/delete/{brandId}")
    public ResponseEntity<?> deleteBrand(@PathVariable Integer brandId) {
        try {
            boolean isDeleted = brandService.deleteBrand(brandId);
            if (isDeleted) {
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công"),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        Map.of("message", "Thương hiệu không tồn tại"),
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
}
