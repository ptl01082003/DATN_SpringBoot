package com.example.datn_be.respository;

import com.example.datn_be.entity.Styles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StylesRepository extends JpaRepository<Styles, Integer> {
}