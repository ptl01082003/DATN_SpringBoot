package com.example.datn_be.service;

import com.example.datn_be.dto.OrderItemsDTO;

import java.math.BigDecimal;
import java.util.List;

public interface OrderItemsService {
    List<OrderItemsDTO> getOrdersByStatus(String status);

//    List<OrderItemsDTO> getOrderItemsByStatus(String status);
//
//    List<Object[]> countOrderByYear(int year);
//
//    List<Object[]> turnoverByYear(int year);
//
//    List<Object[]> countOrderByTime(String begin, String end);
//
//    long countOrdersByWaitingForConfirmation();
//
//    long countOrdersByDelivered();
//
//    long countOrdersByCancelled();
//
//    Long countSoldItems();
//
//    List<OrderItemsDTO> findOrdersByTime(String beginDate, String endDate);
//
//    List<OrderItemsDTO> getOrdersByTotalMoney(BigDecimal totalBegin, BigDecimal totalEnd);
//
//    List<Object[]> countOrdersByDay(int month, int year);

}
