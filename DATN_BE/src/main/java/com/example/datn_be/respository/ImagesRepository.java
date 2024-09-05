package com.example.datn_be.respository;

import com.example.datn_be.entity.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagesRepository extends JpaRepository<Images, Integer> {

    void deleteByProducts_ProductId(Integer productId);

}