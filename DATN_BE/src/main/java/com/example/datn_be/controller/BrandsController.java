package com.example.datn_be.controller;

import com.example.datn_be.dto.BrandsDTO;
import com.example.datn_be.entity.Brands;
import com.example.datn_be.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/brands")
public class BrandsController {

    @Autowired
    private BrandService brandService;

    // Thêm thương hiệu mới
    @PostMapping("/create")
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

    // Lấy tất cả thương hiệu (thay vì GET, sử dụng POST)
    @GetMapping("")
    public ResponseEntity<?> getBrands() {
        try {
            Iterable<Brands> brands = brandService.getBrands();
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

    // Lấy thương hiệu theo ID (thay vì GET, sử dụng POST)
    @PostMapping("/getById")
    public ResponseEntity<?> getById(@RequestBody Map<String, Integer> request) {
        try {
            Integer brandId = request.get("brandId");
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

    // Cập nhật thương hiệu (thay vì PUT, sử dụng POST)
    @PostMapping("/edit")
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

    // Xóa thương hiệu theo ID (thay vì DELETE, sử dụng POST)
    @PostMapping("/remove")
    public ResponseEntity<?> deleteBrand(@RequestBody Map<String, Integer> request) {
        try {
            Integer brandId = request.get("brandId");
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
