package com.example.datn_be.service;

import com.example.datn_be.dto.OrderItemsDTO;
import com.example.datn_be.entity.OrderItems;

import java.math.BigDecimal;
import java.util.List;

public interface OrderItemsService {
    List<OrderItemsDTO> getOrdersByStatus(String status);
    boolean updateOrderStatus(Integer orderItemId, String newStatus);


    List<Object[]> countOrderByYear(int year);
    List<Object[]> turnoverByYear(int year);
    List<Object[]> countOrderByTime(String begin, String end);
    long countByWaitingForConfirmation();
    long countByDelivered();
    long countByCanceled();
    Long countSoldItems();
    List<OrderItems> findByTime(String beginDate, String endDate);
    List<OrderItems> getOrderByTotalMoney(double totalBegin, double totalEnd);
    List<Object[]> countOrdersByDay(int month, int year);

}
