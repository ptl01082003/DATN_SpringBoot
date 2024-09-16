package com.example.datn_be.controller;

import com.example.datn_be.dto.*;
import com.example.datn_be.entity.OrderItems;
import com.example.datn_be.respository.OrderItemsRepository;
import com.example.datn_be.service.OrderItemsService;
import com.example.datn_be.service.ReviewersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrdersController {

    @Autowired
    private ReviewersService reviewersService;

    @Autowired
    private OrderItemsService orderItemsService;
    @Autowired
    private OrderItemsRepository orderItemsRepository;

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


    // Lấy thống kê đơn hàng theo năm
    @PostMapping("/statistics-year")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<OrderCountByMonthDTO>> countOrderByYear(@RequestParam int year) {
        return ResponseEntity.ok(orderItemsService.countOrderByYear(year));
    }

    // Lấy thống kê doanh thu theo năm
    @PostMapping("/turnover-year")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<TurnoverByMonthDTO>> turnoverByYear(@RequestParam int year) {
        return ResponseEntity.ok(orderItemsService.turnoverByYear(year));
    }

    // Lấy thống kê đơn hàng theo khoảng thời gian
    @PostMapping("/statistics/time")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<Object[]>> countOrderByTime(@RequestParam String begin, @RequestParam String end) {
        return ResponseEntity.ok(orderItemsService.countOrderByTime(begin, end));
    }

    // Đếm số lượng đơn hàng đang chờ xác nhận
    @PostMapping("/statistics/waiting-confirmation")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Long> countByWaitingForConfirmation() {
        return ResponseEntity.ok(orderItemsService.countByWaitingForConfirmation());
    }

    // Đếm số lượng đơn hàng đã giao
    @PostMapping("/statistics/delivered")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Long> countByDelivered() {
        return ResponseEntity.ok(orderItemsService.countByDelivered());
    }

    // Đếm số lượng đơn hàng đã hủy
    @PostMapping("/statistics/canceled")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Long> countByCanceled() {
        return ResponseEntity.ok(orderItemsService.countByCanceled());
    }

    // Đếm số lượng sản phẩm đã bán
    @PostMapping("/statistics/sold-items")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<SoldItemDTO> countSoldItems() {
        Long quantitySold = orderItemsService.countSoldItems();
        SoldItemDTO soldItemDTO = new SoldItemDTO(quantitySold);
        return ResponseEntity.ok(soldItemDTO);
    }


    // Tìm đơn hàng theo khoảng thời gian
    @PostMapping("/by-time")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<OrderItems>> getOrdersByTime(
            @RequestParam("beginDate") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime beginDate,
            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endDate) {
        List<OrderItems> orders = orderItemsService.findByTime(beginDate, endDate);
        return ResponseEntity.ok(orders);
    }


    // Tìm đơn hàng theo tổng tiền
    @PostMapping("/by-total-money")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<OrderItems>> getOrderByTotalMoney(@RequestParam BigDecimal totalBegin, @RequestParam BigDecimal totalEnd) {
        return ResponseEntity.ok(orderItemsService.getOrderByTotalMoney(totalBegin, totalEnd));
    }

    // Lấy thống kê số lượng đơn hàng từng ngày trong tháng hiện tại
    @PostMapping("/statistics/daily")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<Object[]>> countOrdersByDay(@RequestParam int month, @RequestParam int year) {
        return ResponseEntity.ok(orderItemsService.countOrdersByDay(month, year));
    }


    @GetMapping("/revenue/day")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public BigDecimal getRevenueByDay(@RequestParam String dayStart, @RequestParam String dayEnd) {
        LocalDateTime start = LocalDateTime.parse(dayStart);
        LocalDateTime end = LocalDateTime.parse(dayEnd);
        return orderItemsService.getTotalRevenueByDay(start, end);
    }

    @GetMapping("/revenue/month")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public BigDecimal getRevenueByMonth(@RequestParam int year, @RequestParam int month) {
        YearMonth yearMonth = YearMonth.of(year, month);
        return orderItemsService.getTotalRevenueByMonth(yearMonth);
    }

    @GetMapping("/revenue/year")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public BigDecimal getRevenueByYear(@RequestParam int year) {
        Year yearObj = Year.of(year);
        return orderItemsService.getTotalRevenueByYear(yearObj);
    }

    @GetMapping("/orders/status")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public Long getOrdersByStatus(@RequestParam OrderItems.ORDER_STATUS status,
                                  @RequestParam String startDate,
                                  @RequestParam String endDate) {
        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);
        return orderItemsService.getTotalOrdersByStatusAndDay(status, start, end);
    }

}