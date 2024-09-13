package com.example.datn_be.controller;

import com.example.datn_be.dto.BrandsDTO;
import com.example.datn_be.dto.MaterialsDTO;
import com.example.datn_be.dto.StylesDTO;
import com.example.datn_be.entity.Brands;
import com.example.datn_be.entity.Materials;
import com.example.datn_be.entity.Styles;
import com.example.datn_be.service.StyleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/styles")
public class StyleController {
    @Autowired
    StyleService styleService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<?> createStyle(@RequestBody StylesDTO stylesDTO){
        try {
            Styles styles=styleService.addStyles(stylesDTO);
            return new ResponseEntity<>(
                    Map.of("message","Complete","data",styles),
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
    public ResponseEntity<?> getStyle() {
        try {
            List<Styles> styles = styleService.getStyle();
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thành công", "data", styles),
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
            Integer style = request.get("styleId");
            Styles styles = styleService.getById(style);
            if (style != null) {
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công", "data", styles),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        Map.of("message", "Style không tồn tại"),
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
    public ResponseEntity<?> updateStyle(@RequestBody StylesDTO stylesDTO) {
        try {
            Styles updatedStyle = styleService.updateStyle(stylesDTO);
            if (updatedStyle != null) {
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công", "data", updatedStyle),
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
    public ResponseEntity<Map<String, Object>> deleteMaterial(@RequestParam("styleId") Integer styleId) {
        if (styleId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "styleId không được để trống"));
        }
        try {
            boolean isDeleted = styleService.deleteStyle(styleId);
            if (isDeleted) {
                return ResponseEntity.ok(Map.of("message", "Thực hiện thành công"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Phong cách không tồn tại"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Thực hiện thất bại", "error", e.getMessage()));
        }
    }
}
