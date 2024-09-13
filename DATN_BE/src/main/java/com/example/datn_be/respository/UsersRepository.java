package com.example.datn_be.respository;
import com.example.datn_be.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {
    Optional<Users> findByUserName(String userName);
    Users findByUserId(Integer userId);

    // Tìm kiếm theo email
    Users findByEmail(String email);



}
