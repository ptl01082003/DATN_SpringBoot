package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.OrderItemsDTO;
import com.example.datn_be.entity.OrderItems;
import com.example.datn_be.entity.PaymentDetails;
import com.example.datn_be.respository.OrderItemsRepository;
import com.example.datn_be.respository.PaymentDetailsRepository;
import com.example.datn_be.service.OrderItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderItemsServiceImpl implements OrderItemsService {


    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;

    @Override
    public List<OrderItemsDTO> getOrdersByStatus(String status) {
        List<OrderItems> orderItems;
        try {
            if (status != null && !status.isEmpty()) {
                OrderItems.ORDER_STATUS orderStatus;
                try {
                    orderStatus = OrderItems.ORDER_STATUS.valueOf(status.toUpperCase());
                } catch (IllegalArgumentException e) {
                    // Trạng thái không hợp lệ
                    return new ArrayList<>();
                }
                orderItems = orderItemsRepository.findByStatus(orderStatus);
            } else {
                orderItems = orderItemsRepository.findAll();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }

        List<OrderItemsDTO> response = new ArrayList<>();

        for (OrderItems orders : orderItems) {
            // Tìm thông tin thanh toán cho đơn hàng
            PaymentDetails payment = paymentDetailsRepository.findByOrderDetails_OrderDetailId(
                    orders.getOrderDetails() != null ? orders.getOrderDetails().getOrderDetailId() : null
            );

            boolean isPaid = payment != null && PaymentDetails.PAYMENT_STATUS.SUCCESS.equals(payment.getStatus());

            // Kiểm tra giá trị null trước khi sử dụng
            BigDecimal priceDiscount = orders.getProductDetails() != null && orders.getProductDetails().getProducts() != null ?
                    orders.getProductDetails().getProducts().getPriceDiscount() : BigDecimal.ZERO;
            BigDecimal productPrice = isPaid ?
                    (orders.getPrice() != null ? BigDecimal.valueOf(orders.getPrice()) : BigDecimal.ZERO) :
                    (orders.getProductDetails() != null && orders.getProductDetails().getProducts() != null ?
                            orders.getProductDetails().getProducts().getPrice() : BigDecimal.ZERO);

            // Đảm bảo các thuộc tính không null trước khi gọi phương thức
            String statusName = orders.getStatus() != null ? orders.getStatus().name() : "UNKNOWN";
            String returnStatusName = orders.getReturnStatus() != null ? orders.getReturnStatus().name() : "UNKNOWN";

            // Tạo DTO cho từng đơn hàng
            OrderItemsDTO dto = new OrderItemsDTO(
                    orders.getOrderItemId(),
                    (double) (orders.getAmount() != null ? orders.getAmount().intValue() : 0),
                    statusName,
                    returnStatusName,
                    productPrice,
                    isPaid ? (orders.getPriceDiscount() != null ? BigDecimal.valueOf(orders.getPriceDiscount()) : priceDiscount) : priceDiscount,
                    orders.getUserId(),
                    orders.getIsReview() != null ? orders.getIsReview() : false,
                    orders.getQuanity(),
                    orders.getProductDetails() != null ? orders.getProductDetails().getProductDetailId() : null,
                    orders.getOrderDetails() != null ? orders.getOrderDetails().getOrderDetailId() : null,
                    orders.getCreatedAt(),
                    orders.getUpdatedAt(),
                    orders.getProductDetails() != null ? orders.getProductDetails().getProducts().getProductId() : null,
                    orders.getProductDetails() != null ? orders.getProductDetails().getProducts().getName() : null,
                    orders.getProductDetails() != null ? Integer.valueOf(orders.getProductDetails().getSizes().getName()) : null,
                    orders.getProductDetails() != null ? orders.getProductDetails().getSellQuanity(): null,
                    orders.getProductDetails() != null ? orders.getProductDetails().getProducts().getCode() : null,
                    orders.getProductDetails() != null ? orders.getProductDetails().getProducts().getName() : null
            );

            response.add(dto);
        }
        return response;
    }

    @Override
    @Transactional
    public boolean updateOrderStatus(Integer orderItemId, String status) {
        try {
            OrderItems orderItem = orderItemsRepository.findById(orderItemId)
                    .orElseThrow(() -> new RuntimeException("Order item not found"));

            orderItem.setStatus(OrderItems.ORDER_STATUS.valueOf(status));
            orderItemsRepository.save(orderItem);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    @Override
    public List<Object[]> countOrderByYear(int year) {
        return orderItemsRepository.countOrderByYear(year);
    }

    @Override
    public List<Object[]> turnoverByYear(int year) {
        return orderItemsRepository.turnoverByYear(year);
    }

    @Override
    public List<Object[]> countOrderByTime(String begin, String end) {
        return orderItemsRepository.countOrderByTime(begin, end);
    }

    @Override
    public long countByWaitingForConfirmation() {
        return orderItemsRepository.countByWaitingForConfirmation();
    }

    @Override
    public long countByDelivered() {
        return orderItemsRepository.countByDelivered();
    }

    @Override
    public long countByCanceled() {
        return orderItemsRepository.countByCanceled();
    }

    @Override
    public Long countSoldItems() {
        return orderItemsRepository.countSoldItems();
    }

    @Override
    public List<OrderItems> findByTime(String beginDate, String endDate) {
        return orderItemsRepository.findByTime(beginDate, endDate);
    }

    @Override
    public List<OrderItems> getOrderByTotalMoney(double totalBegin, double totalEnd) {
        return orderItemsRepository.getOrderByTotalMoney(totalBegin, totalEnd);
    }

    @Override
    public List<Object[]> countOrdersByDay(int month, int year) {
        return orderItemsRepository.countOrdersByDay(month, year);
    }

}