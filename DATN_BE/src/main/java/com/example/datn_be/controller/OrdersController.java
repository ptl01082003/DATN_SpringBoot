package com.example.datn_be.controller;

import com.example.datn_be.dto.OrderItemsDTO;
import com.example.datn_be.dto.ReviewersDTO;
import com.example.datn_be.entity.OrderItems;
import com.example.datn_be.service.OrderItemsService;
import com.example.datn_be.service.ReviewersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<List<OrderItemsDTO>> getOrdersByStatus(@RequestParam(required = false) String status) {
        List<OrderItemsDTO> orders = orderItemsService.getOrdersByStatus(status);
        return ResponseEntity.ok(orders);
    }

    // Tạo đánh giá
    @PostMapping("/update-status")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
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


    // Get order statistics by year
    @PostMapping("/statistics-year")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<Object[]>> countOrderByYear(@RequestParam int year) {
        return ResponseEntity.ok(orderItemsService.countOrderByYear(year));
    }

    // Get turnover statistics by year
    @PostMapping("/turnover-year")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<Object[]>> turnoverByYear(@RequestParam int year) {
        return ResponseEntity.ok(orderItemsService.turnoverByYear(year));
    }

    // Get order statistics by time range
    @PostMapping("/statistics/time")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<Object[]>> countOrderByTime(@RequestParam String begin, @RequestParam String end) {
        return ResponseEntity.ok(orderItemsService.countOrderByTime(begin, end));
    }

    // Count orders waiting for confirmation
    @PostMapping("/statistics/waiting-confirmation")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Long> countByWaitingForConfirmation() {
        return ResponseEntity.ok(orderItemsService.countByWaitingForConfirmation());
    }

    // Count delivered orders
    @PostMapping("/statistics/delivered")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Long> countByDelivered() {
        return ResponseEntity.ok(orderItemsService.countByDelivered());
    }

    // Count canceled orders
    @PostMapping("/statistics/canceled")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Long> countByCanceled() {
        return ResponseEntity.ok(orderItemsService.countByCanceled());
    }

    // Count sold items
    @PostMapping("/statistics/sold-items")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Long> countSoldItems() {
        return ResponseEntity.ok(orderItemsService.countSoldItems());
    }

    // Find orders by time range
    @PostMapping("/by-time")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<OrderItems>> findByTime(@RequestParam String beginDate, @RequestParam String endDate) {
        return ResponseEntity.ok(orderItemsService.findByTime(beginDate, endDate));
    }

    // Find orders by total money range
    @PostMapping("/by-total-money")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<OrderItems>> getOrderByTotalMoney(@RequestParam double totalBegin, @RequestParam double totalEnd) {
        return ResponseEntity.ok(orderItemsService.getOrderByTotalMoney(totalBegin, totalEnd));
    }

    // Get daily order statistics for current month
    @PostMapping("/statistics/daily")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<Object[]>> countOrdersByDay(@RequestParam int month, @RequestParam int year) {
        return ResponseEntity.ok(orderItemsService.countOrdersByDay(month, year));
    }
}