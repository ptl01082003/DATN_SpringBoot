package com.example.datn_be.respository;

import com.example.datn_be.entity.UserVouchers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserVouchersRepository extends JpaRepository<UserVouchers, Integer> {
}
