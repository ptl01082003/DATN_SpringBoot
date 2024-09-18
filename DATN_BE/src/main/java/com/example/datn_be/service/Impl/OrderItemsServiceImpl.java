package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.OrderCountByMonthDTO;
import com.example.datn_be.dto.OrderItemsDTO;
import com.example.datn_be.dto.TurnoverByMonthDTO;
import com.example.datn_be.entity.OrderItems;
import com.example.datn_be.entity.PaymentDetails;
import com.example.datn_be.entity.ProductDetails;
import com.example.datn_be.respository.OrderItemsRepository;
import com.example.datn_be.respository.PaymentDetailsRepository;
import com.example.datn_be.respository.ProductDetailsRepository;
import com.example.datn_be.service.OrderItemsService;
import com.example.datn_be.service.ThymeleafService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class OrderItemsServiceImpl implements OrderItemsService {

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;

    @Autowired
    private ProductDetailsRepository productDetailsRepository;

    @Autowired
    private ThymeleafService thymeleafService;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public List<OrderItemsDTO> getOrdersByStatus(String status) {
        List<OrderItems> orderItems;
        try {
            if (status != null && !status.isEmpty()) {
                OrderItems.ORDER_STATUS orderStatus;
                try {
                    orderStatus = OrderItems.ORDER_STATUS.valueOf(status.toUpperCase());
                } catch (IllegalArgumentException e) {
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

        orderItems.sort(Comparator.comparing(OrderItems::getCreatedAt).reversed());

        List<OrderItemsDTO> response = new ArrayList<>();
        for (OrderItems orders : orderItems) {
            PaymentDetails payment = paymentDetailsRepository.findByOrderDetails_OrderDetailId(
                    orders.getOrderDetails() != null ? orders.getOrderDetails().getOrderDetailId() : null
            );
            boolean isPaid = payment != null && PaymentDetails.PAYMENT_STATUS.SUCCESS.equals(payment.getStatus());

            BigDecimal priceDiscount = orders.getProductDetails() != null && orders.getProductDetails().getProducts() != null ?
                    orders.getProductDetails().getProducts().getPriceDiscount() : BigDecimal.ZERO;
            BigDecimal productPrice = isPaid ?
                    (orders.getPrice() != null ? orders.getPrice() : BigDecimal.ZERO) :
                    (orders.getProductDetails() != null && orders.getProductDetails().getProducts() != null ?
                            orders.getProductDetails().getProducts().getPrice() : BigDecimal.ZERO);

            String statusName = orders.getStatus() != null ? orders.getStatus().name() : "UNKNOWN";
            String returnStatusName = orders.getReturnStatus() != null ? orders.getReturnStatus().name() : "UNKNOWN";

            String path = orders.getProductDetails() != null && orders.getProductDetails().getProducts() != null &&
                    orders.getProductDetails().getProducts().getGallery() != null &&
                    !orders.getProductDetails().getProducts().getGallery().isEmpty() ?
                    orders.getProductDetails().getProducts().getGallery().get(0).getPath() : null;

            OrderItemsDTO dto = new OrderItemsDTO(
                    orders.getOrderItemId(),
                    orders.getAmount() != null ? orders.getAmount() : BigDecimal.valueOf(0),
                    statusName,
                    returnStatusName,
                    productPrice,
                    isPaid ? (orders.getPriceDiscount() != null ? orders.getPriceDiscount() : priceDiscount) : priceDiscount,
                    orders.getOrderItemId(),
                    orders.getIsReview() != null ? orders.getIsReview() : false,
                    orders.getQuanity(),
                    orders.getProductDetails() != null ? orders.getProductDetails().getProductDetailId() : null,
                    orders.getOrderDetails() != null ? orders.getOrderDetails().getOrderDetailId() : null,
                    orders.getCreatedAt(),
                    orders.getUpdatedAt(),
                    orders.getProductDetails() != null ? orders.getProductDetails().getProducts().getProductId() : null,
                    path,
                    orders.getProductDetails() != null ? Integer.valueOf(orders.getProductDetails().getSizes().getName()) : null,
                    orders.getProductDetails() != null ? orders.getProductDetails().getSellQuanity() : null,
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
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

            OrderItems.ORDER_STATUS newStatus = OrderItems.ORDER_STATUS.valueOf(status);
            OrderItems.ORDER_STATUS oldStatus = orderItem.getStatus();

            // Cập nhật trạng thái đơn hàng
            orderItem.setStatus(newStatus);
            orderItemsRepository.save(orderItem);

            // Xử lý khi trạng thái chuyển từ "Chờ xác nhận" sang "Chờ lấy hàng"
            if (OrderItems.ORDER_STATUS.CHO_XAC_NHAN.equals(oldStatus) &&
                    OrderItems.ORDER_STATUS.CHO_LAY_HANG.equals(newStatus)) {
                generateInvoice(orderItem);
                // Tạo hóa đơn
                sendEmail(orderItem);
                updateStock(orderItem, -orderItem.getQuanity());
            }
            // Xử lý khi trạng thái chuyển từ "Chờ lấy hàng" hoặc "Chờ giao hàng" sang "Đã hủy"
            else if (OrderItems.ORDER_STATUS.DA_HUY.equals(newStatus)) {
                if (OrderItems.ORDER_STATUS.CHO_LAY_HANG.equals(oldStatus) ||
                        OrderItems.ORDER_STATUS.CHO_GIAO_HANG.equals(oldStatus)) {
                    updateStock(orderItem, orderItem.getQuanity());
                    // Gọi phương thức tạo hóa đơn và gửi email
                    thymeleafService.generateInvoiceAndSendEmail(orderItem);
                }
            }
            // Xử lý khi trạng thái chuyển sang "Giao không thành công"
            else if (OrderItems.ORDER_STATUS.KHONG_THANH_CONG.equals(newStatus)) {
                if (OrderItems.ORDER_STATUS.CHO_GIAO_HANG.equals(oldStatus)) {
                    updateStock(orderItem, orderItem.getQuanity());
                }
            }
            // Xử lý khi trạng thái chuyển sang "Đã nhập kho"
            else if (OrderItems.ORDER_STATUS.NHAP_KHO.equals(newStatus)) {
                if (OrderItems.ORDER_STATUS.KHONG_THANH_CONG.equals(oldStatus)) {
                    updateStock(orderItem, orderItem.getQuanity()); // Cập nhật số lượng kho khi nhập lại
                }
            }

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private void generateInvoice(OrderItems orderItem) {
        // Sử dụng ThymeleafService để tạo hóa đơn
        thymeleafService.generateInvoiceAndSendEmail(orderItem);
    }

    private void sendEmail(OrderItems orderItem) {
        // Lấy email khách hàng từ OrderDetails
        String customerEmail = orderItem.getOrderDetails().getUsers().getEmail();
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
            messageHelper.setTo(customerEmail);
            messageHelper.setSubject("Hóa Đơn Đặt Hàng");
            messageHelper.setText(thymeleafService.generateInvoiceAndSendEmail(orderItem), true); // true để gửi dưới dạng HTML
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send email", e);
        }
    }

    private void updateStock(OrderItems orderItem, int quantityChange) {
        ProductDetails productDetails = orderItem.getProductDetails();
        if (productDetails != null) {
            int currentStock = productDetails.getQuantity() != null ? productDetails.getQuantity() : 0;
            productDetails.setQuantity(currentStock + quantityChange);
            productDetails.setSellQuanity(productDetails.getSellQuanity() != null
                    ? productDetails.getSellQuanity() + quantityChange : quantityChange);
            productDetailsRepository.save(productDetails);
        }
    }

    @Override
    public OrderItems findByOrderItemId(Integer orderItemId) {
        return orderItemsRepository.findByOrderItemId(orderItemId);
    }

    @Override
    public List<OrderCountByMonthDTO> countOrderByYear(int year) {
        List<Object[]> results = orderItemsRepository.countOrderByYear(year);
        List<OrderCountByMonthDTO> dtos = new ArrayList<>();
        for (Object[] result : results) {
            int month = ((Number) result[0]).intValue();
            long total = ((Number) result[1]).longValue();
            dtos.add(new OrderCountByMonthDTO(month, total));
        }
        return dtos;
    }

    @Override
    public List<TurnoverByMonthDTO> turnoverByYear(int year) {
        List<Object[]> results = orderItemsRepository.turnoverByYear(year);
        List<TurnoverByMonthDTO> dtos = new ArrayList<>();
        for (Object[] result : results) {
            int month = ((Number) result[0]).intValue();
            BigDecimal total = (BigDecimal) result[1];
            dtos.add(new TurnoverByMonthDTO(month, total));
        }
        return dtos;
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
    public long countSoldItems() {
        return orderItemsRepository.countSoldItems();
    }

    //    @Override
//    public List<OrderItems> findByTime(String beginDate, String endDate) {
//        // Định dạng chuỗi ngày giờ theo định dạng SQL
//        DateTimeFormatter sqlFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//
//        // Trim các khoảng trắng đầu và cuối chuỗi ngày giờ
//        beginDate = beginDate.trim();
//        endDate = endDate.trim();
//
//        try {
//            // Chuyển đổi chuỗi ngày giờ từ định dạng đầu vào thành LocalDateTime
//            LocalDateTime beginDateTime = LocalDateTime.parse(beginDate, sqlFormatter);
//            LocalDateTime endDateTime = LocalDateTime.parse(endDate, sqlFormatter);
//
//            // Chuyển đổi LocalDateTime thành chuỗi theo định dạng SQL (nếu cần)
//            LocalDateTime formattedBeginDate = LocalDateTime.parse(beginDateTime.format(sqlFormatter));
//            String formattedEndDate = endDateTime.format(sqlFormatter);
//
//            // Gọi phương thức trong Repository với các tham số đã được định dạng
//            return orderItemsRepository.findByTime(formattedBeginDate, LocalDateTime.parse(formattedEndDate));
//        } catch (DateTimeParseException e) {
//            throw new IllegalArgumentException("Invalid date format. Please use 'yyyy-MM-dd HH:mm:ss'.", e);
//        }
//    }
    @Override
    public List<OrderItems> findByTime(LocalDateTime beginDate, LocalDateTime endDate) {
        // Gọi phương thức trong Repository trực tiếp với các tham số LocalDateTime
        return orderItemsRepository.findByTime(beginDate, endDate);
    }



    @Override
    public List<OrderItems> getOrderByTotalMoney(BigDecimal totalBegin, BigDecimal totalEnd) {
        return orderItemsRepository.getOrderByTotalMoney(totalBegin, totalEnd);
    }

    @Override
    public List<Object[]> countOrdersByDay(int month, int year) {
        return orderItemsRepository.countOrdersByDay(month, year);
    }


    @Override
    public BigDecimal getTotalRevenueByDay(LocalDateTime dayStart, LocalDateTime dayEnd) {
        return orderItemsRepository.getTotalRevenueBetweenDates(dayStart, dayEnd);
    }

    @Override
    public BigDecimal getTotalRevenueByMonth(YearMonth yearMonth) {
        LocalDateTime startOfMonth = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);
        return orderItemsRepository.getTotalRevenueBetweenDates(startOfMonth, endOfMonth);
    }

    @Override
    public BigDecimal getTotalRevenueByYear(Year year) {
        LocalDateTime startOfYear = year.atDay(1).atStartOfDay();
        LocalDateTime endOfYear = year.atMonth(12).atEndOfMonth().atTime(23, 59, 59);
        return orderItemsRepository.getTotalRevenueBetweenDates(startOfYear, endOfYear);
    }

    @Override
    public Long getTotalOrdersByDay(LocalDateTime dayStart, LocalDateTime dayEnd) {
        return orderItemsRepository.getTotalOrdersBetweenDates(dayStart, dayEnd);
    }

    @Override
    public Long getTotalOrdersByMonth(YearMonth yearMonth) {
        LocalDateTime startOfMonth = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);
        return orderItemsRepository.getTotalOrdersBetweenDates(startOfMonth, endOfMonth);
    }

    @Override
    public Long getTotalOrdersByYear(Year year) {
        LocalDateTime startOfYear = year.atDay(1).atStartOfDay();
        LocalDateTime endOfYear = year.atMonth(12).atEndOfMonth().atTime(23, 59, 59);
        return orderItemsRepository.getTotalOrdersBetweenDates(startOfYear, endOfYear);
    }

    @Override
    public Long getTotalOrdersByStatusAndDay(OrderItems.ORDER_STATUS status, LocalDateTime dayStart, LocalDateTime dayEnd) {
        return orderItemsRepository.getTotalOrdersByStatusBetweenDates(status, dayStart, dayEnd);
    }

    @Override
    public Long getTotalOrdersByStatusAndMonth(OrderItems.ORDER_STATUS status, YearMonth yearMonth) {
        LocalDateTime startOfMonth = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);
        return orderItemsRepository.getTotalOrdersByStatusBetweenDates(status, startOfMonth, endOfMonth);
    }

    @Override
    public Long getTotalOrdersByStatusAndYear(OrderItems.ORDER_STATUS status, Year year) {
        LocalDateTime startOfYear = year.atDay(1).atStartOfDay();
        LocalDateTime endOfYear = year.atMonth(12).atEndOfMonth().atTime(23, 59, 59);
        return orderItemsRepository.getTotalOrdersByStatusBetweenDates(status, startOfYear, endOfYear);
    }



}