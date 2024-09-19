package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.ProductsDTO;
import com.example.datn_be.dto.ProductDetailsDTO;
import com.example.datn_be.entity.Images;
import com.example.datn_be.entity.ProductDetails;
import com.example.datn_be.entity.Products;
import com.example.datn_be.respository.*;
import com.example.datn_be.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private OriginsRepository originsRepository;

    @Autowired
    private StylesRepository stylesRepository;

    @Autowired
    private MaterialsRepository materialsRepository;

    @Autowired
    private BrandsRepository brandsRepository;

    @Autowired
    private ProductDetailsRepository productDetailsRepository;

    @Autowired
    private ImagesRepository imagesRepository;

    @Autowired
    private SizesRepository sizesRepository;

    @Override
    @Transactional
    public Products addProduct(ProductsDTO productDTO) {
        Products product = new Products();
        product.setName(productDTO.getName());
        product.setCode(productDTO.getCode());
        product.setImportPrice(productDTO.getImportPrice());
        product.setPrice(productDTO.getPrice());
        product.setStatus(productDTO.getStatus());
        product.setDescription(productDTO.getDescription());
        product.setPriceDiscount(productDTO.getPriceDiscount());

        // Set các thuộc tính quan hệ từ ID
        product.setOrigins(originsRepository.findById(productDTO.getOriginId())
                .orElseThrow(() -> new IllegalArgumentException("Không hợp lệ origin ID: " + productDTO.getOriginId())));
        product.setStyles(stylesRepository.findById(productDTO.getStyleId())
                .orElseThrow(() -> new IllegalArgumentException("Không hợp lệ style ID: " + productDTO.getStyleId())));
        product.setMaterials(materialsRepository.findById(productDTO.getMaterialId())
                .orElseThrow(() -> new IllegalArgumentException("Không hợp lệ material ID: " + productDTO.getMaterialId())));
        product.setBrands(brandsRepository.findById(productDTO.getBrandId())
                .orElseThrow(() -> new IllegalArgumentException("Không hợp lệ brand ID: " + productDTO.getBrandId())));

        Products savedProduct = productsRepository.save(product);

        if (productDTO.getProductDetails() != null) {
            for (ProductDetailsDTO detailDTO : productDTO.getProductDetails()) {
                ProductDetails detail = new ProductDetails();
                detail.setProducts(savedProduct);  // Thiết lập quan hệ giữa ProductDetails và Product
                detail.setSizes(sizesRepository.findById(detailDTO.getSizeId())
                        .orElseThrow(() -> new IllegalArgumentException("Không hợp lệ size ID: " + detailDTO.getSizeId())));
                detail.setQuantity(detailDTO.getQuantity());
                productDetailsRepository.save(detail);
            }
        }

        if (productDTO.getGallery() != null) {
            for (String path : productDTO.getGallery()) {
                Images image = new Images();
                image.setPath(path);
                image.setProducts(savedProduct);  // Thiết lập quan hệ giữa Images và Product
                imagesRepository.save(image);
            }
        }

        return savedProduct;
    }

    @Override
    public List<Products> getProducts() {
        return productsRepository.findAll();
    }

    @Override
    public Products getProductDetails(String code) {
        return productsRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public List<Products> getLstProducts(Map<String, Object> request) {
        try {
            // Xử lý và lọc danh sách sản phẩm dựa trên điều kiện trong request
            String name = (String) request.get("name");
            String code = (String) request.get("code");
            BigDecimal minPrice = (BigDecimal) request.get("minPrice");
            BigDecimal maxPrice = (BigDecimal) request.get("maxPrice");
            Boolean status = (Boolean) request.get("status");

            List<Products> products = productsRepository.findAll();

            if (name != null && !name.isEmpty()) {
                products = products.stream()
                        .filter(p -> p.getName().contains(name))
                        .collect(Collectors.toList());
            }

            if (code != null && !code.isEmpty()) {
                products = products.stream()
                        .filter(p -> p.getCode().equals(code))
                        .collect(Collectors.toList());
            }

            if (minPrice != null) {
                products = products.stream()
                        .filter(p -> p.getPrice().compareTo(minPrice) >= 0)
                        .collect(Collectors.toList());
            }

            if (maxPrice != null) {
                products = products.stream()
                        .filter(p -> p.getPrice().compareTo(maxPrice) <= 0)
                        .collect(Collectors.toList());
            }

            if (status != null) {
                products = products.stream()
                        .filter(p -> p.getStatus().equals(status))
                        .collect(Collectors.toList());
            }

            return products;
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi lấy danh sách sản phẩm theo điều kiện: " + e.getMessage());
        }
    }


    @Override
    @Transactional
    public Products updateProduct(ProductsDTO productDTO) {
        Products product = productsRepository.findById(productDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(productDTO.getName());
        product.setImportPrice(productDTO.getImportPrice());
        product.setPrice(productDTO.getPrice());
        product.setStatus(productDTO.getStatus());
        product.setDescription(productDTO.getDescription());
        product.setPriceDiscount(productDTO.getPrice());

        // Cập nhật các thuộc tính quan hệ
        product.setOrigins(originsRepository.findById(productDTO.getOriginId())
                .orElseThrow(() -> new IllegalArgumentException("Không hợp lệ origin ID: " + productDTO.getOriginId())));
        product.setStyles(stylesRepository.findById(productDTO.getStyleId())
                .orElseThrow(() -> new IllegalArgumentException("Không hợp lệ style ID: " + productDTO.getStyleId())));
        product.setMaterials(materialsRepository.findById(productDTO.getMaterialId())
                .orElseThrow(() -> new IllegalArgumentException("Không hợp lệ material ID: " + productDTO.getMaterialId())));
        product.setBrands(brandsRepository.findById(productDTO.getBrandId())
                .orElseThrow(() -> new IllegalArgumentException("Không hợp lệ brand ID: " + productDTO.getBrandId())));

        productsRepository.save(product);

        // Cập nhật chi tiết sản phẩm
        if (productDTO.getProductDetails() != null) {
            for (ProductDetailsDTO detailDTO : productDTO.getProductDetails()) {
                ProductDetails detail = productDetailsRepository.findByProducts_ProductIdAndSizes_SizeId(
                        productDTO.getProductId(), detailDTO.getSizeId());
                if (detail != null) {
                    detail.setQuantity(detailDTO.getQuantity());
                    productDetailsRepository.save(detail);
                } else {
                    detail = new ProductDetails();
                    detail.setProducts(product);  // Thiết lập quan hệ giữa ProductDetails và Product
                    detail.setSizes(sizesRepository.findById(detailDTO.getSizeId())
                            .orElseThrow(() -> new IllegalArgumentException("Không hợp lệ size ID: " + detailDTO.getSizeId())));
                    detail.setQuantity(detailDTO.getQuantity());
                    productDetailsRepository.save(detail);
                }
            }
        }


        imagesRepository.deleteByProducts_ProductId(productDTO.getProductId());

        if (productDTO.getGallery() != null) {
            for (String path : productDTO.getGallery()) {
                Images image = new Images();
                image.setPath(path);
                image.setProducts(product);
                imagesRepository.save(image);
            }
        }

        return product;
    }

    @Override
    @Transactional
    public boolean deleteProduct(Integer productId) {
        imagesRepository.deleteByProducts_ProductId(productId);
        productDetailsRepository.deleteByProducts_ProductId(productId);
        productsRepository.deleteById(productId);
        return false;
    }

    @Override
    public List<Products> getDiscountedProducts() {
        return productsRepository.findAll().stream()
                .filter(product -> product.getPriceDiscount() != null && product.getPriceDiscount().compareTo(BigDecimal.ZERO) > 0)
                .collect(Collectors.toList());

    }

    public void updateProductStatus(Integer productId, boolean status) {
        // Lấy sản phẩm từ cơ sở dữ liệu
        Products product = productsRepository.findById(productId).orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại"));

        // Cập nhật trạng thái
        product.setStatus(status);

        // Lưu thay đổi vào cơ sở dữ liệu
        productsRepository.save(product);
    }


}