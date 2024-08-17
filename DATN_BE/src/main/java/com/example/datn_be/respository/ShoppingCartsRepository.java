package com.example.datn_be.respository;

import com.example.datn_be.entity.ShoppingCarts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingCartsRepository extends JpaRepository<ShoppingCarts, Integer> {
}