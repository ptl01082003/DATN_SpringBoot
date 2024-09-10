package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.OrderItemsDTO;
import com.example.datn_be.entity.OrderItems;
import com.example.datn_be.entity.PaymentDetails;
import com.example.datn_be.respository.OrderItemsRepository;
import com.example.datn_be.respository.PaymentDetailsRepository;
import com.example.datn_be.service.OrderItemsService;
import com.example.datn_be.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderItemsServiceImpl implements OrderItemsService {
//@Autowired
//private OrderItemsRepository orderItemsRepository;
//
//    @Autowired
//    private PaymentDetailsRepository paymentDetailsRepository;
//
//    @Override
//    public List<OrderItemsDTO> getOrdersByStatus(String status) {
//        // Lọc đơn hàng theo trạng thái
//        List<OrderItems> orderItems = (status != null) ?
//                orderItemsRepository.findByStatus(status) : orderItemsRepository.findAll();
//
//        List<OrderItemsDTO> response = new ArrayList<>();
//
//        for (OrderItems orders : orderItems) {
//            // Tìm thông tin thanh toán cho đơn hàng
//            PaymentDetails payment = paymentDetailsRepository.findByOrderDetails_OrderDetailId(orders.getOrderDetails().getOrderDetailId());
//
//            boolean isPaid = payment != null && PaymentDetails.PAYMENT_STATUS.SUCCESS.equals(payment.getStatus());
//
//            // Kiểm tra giá trị null trước khi sử dụng
//
//            BigDecimal priceDiscount = orders.getProductDetails() != null && orders.getProductDetails().getProducts() != null ?
//                    orders.getProductDetails().getProducts().getPriceDiscount() : BigDecimal.ZERO;
//            BigDecimal productPrice = isPaid ? BigDecimal.valueOf(orders.getPrice() != null ? orders.getPrice() : 0) :
//                    (orders.getProductDetails() != null && orders.getProductDetails().getProducts() != null ?
//                            orders.getProductDetails().getProducts().getPrice() : BigDecimal.ZERO);
//
//            // Đảm bảo các thuộc tính không null trước khi gọi phương thức
//            String statusName = orders.getStatus() != null ? orders.getStatus().name() : "UNKNOWN";
//            String returnStatusName = orders.getReturnStatus() != null ? orders.getReturnStatus().name() : "UNKNOWN";
//
//            // Tạo DTO cho từng đơn hàng
//            OrderItemsDTO dto = new OrderItemsDTO(
//                    orders.getOrderItemId(),
//                    orders.getAmount() != null ? orders.getAmount().intValue() : 0,
//                    statusName,
//                    returnStatusName,
//                    productPrice,
//                    isPaid ? BigDecimal.valueOf(orders.getPriceDiscount() != null ? orders.getPriceDiscount() : 0) : priceDiscount,
//                    orders.getUserId(),
//                    orders.getIsReview() != null ? orders.getIsReview() : false,
//                    orders.getQuanity(),
//                    orders.getProductDetails() != null ? orders.getProductDetails().getProductDetailId() : null,
//                    orders.getOrderDetails() != null ? orders.getOrderDetails().getOrderDetailId() : null,
//                    orders.getCreatedAt(),
//                    orders.getUpdatedAt()
//            );
//
//            response.add(dto);
//        }
//
//        return response;
//    }
//}

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
            // Xử lý lỗi nếu có
            e.printStackTrace(); // In lỗi để kiểm tra
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
                    orders.getAmount() != null ? orders.getAmount().intValue() : 0,
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
                    orders.getUpdatedAt()
            );

            response.add(dto);
        }

        return response;
    }


}