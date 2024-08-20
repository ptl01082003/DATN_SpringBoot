package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.ImagesDTO;
import com.example.datn_be.dto.ProductDetailsDTO;
import com.example.datn_be.dto.ProductsDTO;
import com.example.datn_be.entity.*;
import com.example.datn_be.respository.*;
import com.example.datn_be.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    @Autowired
    private ProductsRepository productRepository;

    @Autowired
    private ProductDetailsRepository productDetailRepository;

    @Autowired
    private ImagesRepository imageRepository;

    @Autowired
    private OriginsRepository originsRepository;

    @Autowired
    private StylesRepository stylesRepository;

    @Autowired
    private MaterialsRepository materialsRepository;

    @Autowired
    private BrandsRepository brandsRepository;

    @Autowired
    private SizesRepository sizesRepository;

    @Override
    public Products addProduct(ProductsDTO productDTO) {
        logger.info("Adding product: {}", productDTO);

        Products product = new Products();
        product.setName(productDTO.getName());
        product.setCode(productDTO.getCode());
        product.setImportPrice(productDTO.getImportPrice());
        product.setPrice(productDTO.getPrice());
        product.setPriceDiscount(productDTO.getPriceDiscount());
        product.setStatus(productDTO.getStatus());
        product.setDisplay(productDTO.getDisplay());
        product.setDescription(productDTO.getDescription());

        Origins origin = originsRepository.findById(productDTO.getOriginId()).orElse(null);
        Styles style = stylesRepository.findById(productDTO.getStyleId()).orElse(null);
        Materials material = materialsRepository.findById(productDTO.getMaterialId()).orElse(null);
        Brands brand = brandsRepository.findById(productDTO.getBrandId()).orElse(null);

        product.setOrigin(origin);
        product.setStyle(style);
        product.setMaterial(material);
        product.setBrand(brand);

        product = productRepository.save(product);
        logger.info("Product saved: {}", product);

        if (productDTO.getProductDetails() != null) {
            for (ProductDetailsDTO detailDTO : productDTO.getProductDetails()) {
                ProductDetails detail = new ProductDetails();
                detail.setProducts(product);

                Sizes size = sizesRepository.findById(detailDTO.getSizeId()).orElse(null);
                detail.setSizes(size);

                detail.setQuantity(detailDTO.getQuantity());
                productDetailRepository.save(detail);
                logger.info("Product detail added: {}", detail);
            }
        }

        if (productDTO.getGallery() != null) {
            for (ImagesDTO imageDTO : productDTO.getGallery()) {
                Images image = new Images();
                image.setProducts(product);
                image.setPath(imageDTO.getPath());
                imageRepository.save(image);
                logger.info("Product image added: {}", image);
            }
        }

        return product;
    }

    @Override
    public List<Products> getProducts() {
        List<Products> products = productRepository.findAll();
        logger.info("Retrieved products: {}", products);
        return products;
    }

    @Override
    public Products getProductById(Integer productId) {
        Products product = productRepository.findById(productId).orElse(null);
        logger.info("Retrieved product by ID {}: {}", productId, product);
        return product;
    }

    @Override
    public Products getProductDetails(String code) {
        Products product = productRepository.findByCode(code);
        logger.info("Retrieved product by code {}: {}", code, product);
        return product;
    }

    @Override
    public Products updateProduct(ProductsDTO productDTO) {
        Optional<Products> existingProductOpt = productRepository.findById(productDTO.getProductId());

        if (existingProductOpt.isPresent()) {
            Products existingProduct = existingProductOpt.get();
            existingProduct.setName(productDTO.getName());
            existingProduct.setCode(productDTO.getCode());
            existingProduct.setImportPrice(productDTO.getImportPrice());
            existingProduct.setPrice(productDTO.getPrice());
            existingProduct.setPriceDiscount(productDTO.getPriceDiscount());
            existingProduct.setStatus(productDTO.getStatus());
            existingProduct.setDisplay(productDTO.getDisplay());
            existingProduct.setDescription(productDTO.getDescription());

            Origins origin = originsRepository.findById(productDTO.getOriginId()).orElse(null);
            Styles style = stylesRepository.findById(productDTO.getStyleId()).orElse(null);
            Materials material = materialsRepository.findById(productDTO.getMaterialId()).orElse(null);
            Brands brand = brandsRepository.findById(productDTO.getBrandId()).orElse(null);

            existingProduct.setOrigin(origin);
            existingProduct.setStyle(style);
            existingProduct.setMaterial(material);
            existingProduct.setBrand(brand);

            if (productDTO.getProductDetails() != null) {
                productDetailRepository.deleteByProducts_ProductId(existingProduct.getProductId());

                for (ProductDetailsDTO detailDTO : productDTO.getProductDetails()) {
                    ProductDetails detail = new ProductDetails();
                    detail.setProducts(existingProduct);

                    Sizes size = sizesRepository.findById(detailDTO.getSizeId()).orElse(null);
                    detail.setSizes(size);

                    detail.setQuantity(detailDTO.getQuantity());
                    productDetailRepository.save(detail);
                    logger.info("Updated product detail: {}", detail);
                }
            }

            if (productDTO.getGallery() != null) {
                imageRepository.deleteByProducts_ProductId(existingProduct.getProductId());

                for (ImagesDTO imageDTO : productDTO.getGallery()) {
                    Images image = new Images();
                    image.setProducts(existingProduct);
                    image.setPath(imageDTO.getPath());
                    imageRepository.save(image);
                    logger.info("Updated product image: {}", image);
                }
            }

            Products updatedProduct = productRepository.save(existingProduct);
            logger.info("Product updated: {}", updatedProduct);
            return updatedProduct;
        }

        logger.warn("Product with ID {} not found for update", productDTO.getProductId());
        return null;
    }

    @Override
    public boolean deleteProduct(Integer productId) {
        if (productRepository.existsById(productId)) {
            productDetailRepository.deleteByProducts_ProductId(productId);
            imageRepository.deleteByProducts_ProductId(productId);
            productRepository.deleteById(productId);
            logger.info("Product with ID {} deleted successfully", productId);
            return true;
        }
        logger.warn("Product with ID {} not found for deletion", productId);
        return false;
    }

    @Override
    public List<Products> getDiscountedProducts() {
        List<Products> discountedProducts = productRepository.findByPriceDiscountGreaterThan(0);
        logger.info("Retrieved discounted products: {}", discountedProducts);
        return discountedProducts;
    }
}
