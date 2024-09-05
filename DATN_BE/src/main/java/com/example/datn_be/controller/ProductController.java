package com.example.datn_be.controller;

import com.example.datn_be.dto.ProductsDTO;
import com.example.datn_be.entity.Products;
import com.example.datn_be.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private ProductService productService;


    @PostMapping("/create")
    public ResponseEntity<?> addProduct(@RequestBody ProductsDTO productDTO) {
        try {
            Products product = productService.addProduct(productDTO);
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thành công", "data", product),
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
    public ResponseEntity<?> getProducts() {
        try {
            List<Products> products = productService.getProducts();
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thành công", "data", products),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }


    @PostMapping("/list")
    public ResponseEntity<?> getLstProducts(@RequestBody Map<String, Object> request) {
        try {
            List<Products> products = productService.getLstProducts(request);
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thành công", "data", products),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    // Lấy chi tiết sản phẩm theo mã sản phẩm (sử dụng POST theo yêu cầu)
    @PostMapping("/details")
    public ResponseEntity<?> getProductDetails(@RequestBody Map<String, String> request) {
        try {
            String code = request.get("code");
            Products product = productService.getProductDetails(code);
            if (product != null) {
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công", "data", product),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        Map.of("message", "Sản phẩm không tồn tại"),
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

    // Cập nhật sản phẩm (sử dụng POST theo yêu cầu)
    @PostMapping("/update")
    public ResponseEntity<?> updateProduct(@RequestBody ProductsDTO productDTO) {
        try {
            Products updatedProduct = productService.updateProduct(productDTO);
            if (updatedProduct != null) {
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công", "data", updatedProduct),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        Map.of("message", "Sản phẩm không tồn tại"),
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

    // Xóa sản phẩm (sử dụng POST theo yêu cầu)
    @PostMapping("/remove")
    public ResponseEntity<?> deleteProduct(@RequestBody Map<String, Integer> request) {
        try {
            Integer productId = request.get("productId");
            boolean isDeleted = productService.deleteProduct(productId);
            if (isDeleted) {
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công"),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        Map.of("message", "Sản phẩm không tồn tại"),
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

    // Lấy sản phẩm có khuyến mãi (sử dụng POST theo yêu cầu)
    @PostMapping("/discounted")
    public ResponseEntity<?> getDiscountedProducts() {
        try {
            List<Products> products = productService.getDiscountedProducts();
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thành công", "data", products),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }
}
