package com.example.datn_be.controller;

import com.example.datn_be.dto.OrderItemsDTO;
import com.example.datn_be.dto.ReviewersDTO;
import com.example.datn_be.service.OrderItemsService;
import com.example.datn_be.service.ReviewersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<List<OrderItemsDTO>> getOrdersByStatus(@RequestParam(required = false) String status) {
        List<OrderItemsDTO> orders = orderItemsService.getOrdersByStatus(status);
        return ResponseEntity.ok(orders);
    }

    // Tạo đánh giá
    @PostMapping("/update-status")
    public ResponseEntity<String> updateOrderStatus(
            @RequestParam String status,
            @RequestParam Integer orderItemId) {
        try {
            boolean result = orderItemsService.updateOrderStatus(orderItemId, status);
            if (result) {
                return ResponseEntity.ok("Order status updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order item not found or invalid status");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update order status");
        }
    }


}
