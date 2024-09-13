package com.example.datn_be.respository;

import com.example.datn_be.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Integer> {

    // Tìm kiếm sản phẩm theo mã code
    Optional<Products> findByCode(String code);

    // Tìm kiếm sản phẩm theo tên
    Optional<Products> findByName(String name);


    @Query("SELECT p FROM Products p WHERE p.priceDiscount > 0")
    List<Products> findDiscountedProducts();
}
