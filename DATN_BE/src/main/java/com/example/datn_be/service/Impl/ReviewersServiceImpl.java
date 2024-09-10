package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.ReviewersDTO;
import com.example.datn_be.entity.Reviewers;
import com.example.datn_be.respository.ReviewersRepository;
import com.example.datn_be.service.ReviewersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewersServiceImpl implements ReviewersService {

    @Autowired
    private com.example.datn_be.respository.ReviewersRepository reviewersRepository;

    @Override
    public ReviewersDTO createReview(ReviewersDTO reviewersDTO, Integer orderItemId) {
        Reviewers reviewer = new Reviewers();
        reviewer.setStars(reviewersDTO.getStars());
        reviewer.setContents(reviewersDTO.getContents());
        reviewersRepository.save(reviewer);
        return reviewersDTO;
    }
}