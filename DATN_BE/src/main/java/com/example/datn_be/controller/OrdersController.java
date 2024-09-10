package com.example.datn_be.controller;

import com.example.datn_be.dto.OrderItemsDTO;
import com.example.datn_be.dto.ReviewersDTO;
import com.example.datn_be.service.OrderItemsService;
import com.example.datn_be.service.ReviewersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrdersController {

    @Autowired
    private ReviewersService reviewersService;

    @Autowired
    private OrderItemsService orderItemsService;

    // Lấy danh sách đơn hàng theo trạng thái (status)
    @PostMapping("/lst-orders")
    public ResponseEntity<List<OrderItemsDTO>> getOrderList(@RequestParam(required = false) String status) {
        List<OrderItemsDTO> orders = orderItemsService.getOrdersByStatus(status);
        return ResponseEntity.ok(orders);
    }

    // Tạo đánh giá
    @PostMapping("/create-review")
    public ResponseEntity<String> createReview(@RequestBody ReviewersDTO reviewersDTO,
                                               @RequestParam Integer orderItemId) {
        reviewersService.createReview(reviewersDTO, orderItemId);
        return ResponseEntity.ok("Review created successfully");
    }
}
