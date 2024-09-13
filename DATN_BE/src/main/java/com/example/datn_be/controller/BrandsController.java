package com.example.datn_be.controller;

import com.example.datn_be.dto.BrandsDTO;
import com.example.datn_be.entity.Brands;
import com.example.datn_be.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/brands")
public class BrandsController {

    @Autowired
    private BrandService brandService;


    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
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

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
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

    @PostMapping("/getById")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
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


    @PostMapping("/edit")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
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

    @PostMapping("/remove")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<Map<String, Object>> deleteBrand(@RequestParam("brandId") Integer brandId) {
        if (brandId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "brandId không được để trống"));
        }
        try {
            boolean isDeleted = brandService.deleteBrand(brandId);
            if (isDeleted) {
                return ResponseEntity.ok(Map.of("message", "Thực hiện thành công"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Thương hiệu không tồn tại"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Thực hiện thất bại", "error", e.getMessage()));
        }
    }

}
