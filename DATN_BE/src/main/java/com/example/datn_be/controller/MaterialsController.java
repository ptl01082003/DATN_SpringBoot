package com.example.datn_be.controller;

import com.example.datn_be.dto.MaterialsDTO;
import com.example.datn_be.entity.Materials;
import com.example.datn_be.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/materials")
public class MaterialsController {
    @Autowired
    MaterialService materialService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<?> createMaterial(@RequestBody MaterialsDTO materialsDTO){
        try {
            Materials materials=materialService.addMaterials(materialsDTO);
            return new ResponseEntity<>(
                    Map.of("code",0,"message","Complete","data",materials),
                    HttpStatus.CREATED
            );
        } catch (Exception e){
            return  new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

        @PostMapping("")
        @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
        public ResponseEntity<?> getMaterials() {
            try {
                List<Materials> materials = materialService.getMaterials();
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công", "data", materials),
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
            Integer material = request.get("materialId");
            Materials materials = materialService.getById(material);
            if (materials != null) {
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công", "data", materials),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        Map.of("message", "Chất liệu không tồn tại"),
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
    public ResponseEntity<?> updateMaterial(@RequestBody MaterialsDTO materialsDTO) {
        try {
            Materials updateMaterial = materialService.updateMaterial(materialsDTO);
            if (updateMaterial != null) {
                return new ResponseEntity<>(
                        Map.of("code",0,"message", "Thực hiện thành công", "data", updateMaterial),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        Map.of("message", "Chất  không tồn tại"),
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
    public ResponseEntity<Map<String, Object>> deleteMaterial(@RequestParam("materialId") Integer materialId) {
        if (materialId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "brandId không được để trống"));
        }
        try {
            boolean isDeleted = materialService.deleteMaterial(materialId);
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


