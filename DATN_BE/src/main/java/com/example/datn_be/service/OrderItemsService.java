package com.example.datn_be.service;

import com.example.datn_be.dto.OrderCountByMonthDTO;
import com.example.datn_be.dto.OrderItemsDTO;
import com.example.datn_be.dto.SoldItemDTO;
import com.example.datn_be.dto.TurnoverByMonthDTO;
import com.example.datn_be.entity.OrderItems;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.YearMonth;
import java.util.List;

public interface OrderItemsService {
    List<OrderItemsDTO> getOrdersByStatus(String status);

    boolean updateOrderStatus(Integer orderItemId, String newStatus);

    OrderItems findByOrderItemId(Integer orderItemId);

    List<OrderCountByMonthDTO> countOrderByYear(int year);

    List<TurnoverByMonthDTO> turnoverByYear(int year);

    List<Object[]> countOrderByTime(String begin, String end);

    long countByWaitingForConfirmation();

    long countByDelivered();

    long countByCanceled();

   long countSoldItems();

    List<OrderItems> findByTime(LocalDateTime beginDate, LocalDateTime endDate);


    List<OrderItems> getOrderByTotalMoney(BigDecimal totalBegin, BigDecimal totalEnd);

    List<Object[]> countOrdersByDay(int month, int year);


    BigDecimal getTotalRevenueByDay(LocalDateTime dayStart, LocalDateTime dayEnd);

    BigDecimal getTotalRevenueByMonth(YearMonth yearMonth);

    BigDecimal getTotalRevenueByYear(Year year);

    Long getTotalOrdersByDay(LocalDateTime dayStart, LocalDateTime dayEnd);

    Long getTotalOrdersByMonth(YearMonth yearMonth);

    Long getTotalOrdersByYear(Year year);

    Long getTotalOrdersByStatusAndDay(OrderItems.ORDER_STATUS status, LocalDateTime dayStart, LocalDateTime dayEnd);

    Long getTotalOrdersByStatusAndMonth(OrderItems.ORDER_STATUS status, YearMonth yearMonth);

    Long getTotalOrdersByStatusAndYear(OrderItems.ORDER_STATUS status, Year year);


}





