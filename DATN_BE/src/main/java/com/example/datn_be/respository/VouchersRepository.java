package com.example.datn_be.respository;

import com.example.datn_be.entity.ReviewerPhoto;
import com.example.datn_be.entity.Vouchers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface VouchersRepository extends JpaRepository<Vouchers, Integer> {

}


