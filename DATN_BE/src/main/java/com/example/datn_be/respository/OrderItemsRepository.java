package com.example.datn_be.respository;

import com.example.datn_be.dto.SoldItemDTO;
import com.example.datn_be.entity.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderItemsRepository extends JpaRepository<OrderItems, Integer> {

    // Lấy danh sách OrderItems theo trạng thái
    List<OrderItems> findByStatus(OrderItems.ORDER_STATUS status);

    OrderItems findByOrderItemId(Integer orderItemId);

    // Thống kê số lượng đơn hàng các tháng theo năm
    @Query(value = "SELECT MONTH(createdAt) as month, COUNT(orderItemId) as total FROM order_items " +
            "WHERE YEAR(createdAt) = :year " +
            "GROUP BY MONTH(createdAt) " +
            "ORDER BY MONTH(createdAt) ASC", nativeQuery = true)
    List<Object[]> countOrderByYear(@Param("year") int year);

    // Thống kê doanh thu các tháng
    @Query(value = "SELECT MONTH(o.createdAt) as month, SUM(oi.amount) as total " +
            "FROM order_items oi " +
            "JOIN order_details o ON oi.orderDetailId = o.orderDetailId " +
            "WHERE YEAR(o.createdAt) = :year " +
            "GROUP BY MONTH(o.createdAt) " +
            "ORDER BY MONTH(o.createdAt) ASC", nativeQuery = true)
    List<Object[]> turnoverByYear(@Param("year") int year);

    // Thống kê số lượng đơn hàng theo khoảng thời gian
    @Query(value = "SELECT MONTH(o.createdAt) as month, COUNT(oi.orderItemId) as total " +
            "FROM order_items oi " +
            "JOIN order_details o ON oi.orderDetailId = o.orderDetailId " +
            "WHERE o.createdAt BETWEEN :begin AND :end " +
            "GROUP BY MONTH(o.createdAt) " +
            "ORDER BY MONTH(o.createdAt) ASC", nativeQuery = true)
    List<Object[]> countOrderByTime(@Param("begin") String begin, @Param("end") String end);

    // Thống kê số lượng đơn hàng theo trạng thái "Chờ xác nhận"
    @Query("SELECT COUNT(e.orderItemId) FROM OrderItems e WHERE e.status = 'CHO_XAC_NHAN'")
    long countByWaitingForConfirmation();

    // Thống kê số lượng đơn hàng theo trạng thái "Đã giao"
    @Query("SELECT COUNT(e.orderItemId) FROM OrderItems e WHERE e.status = 'DA_GIAO'")
    long countByDelivered();

    // Thống kê số lượng đơn hàng theo trạng thái "Đã hủy"
    @Query("SELECT COUNT(e.orderItemId) FROM OrderItems e WHERE e.status = 'DA_HUY'")
    long countByCanceled();

    // Thống kê số lượng sản phẩm đã bán
    @Query(value = "SELECT SUM(oi.quanity) " +
            "FROM order_items oi "+
            "WHERE oi.status = 'DA_GIAO'", nativeQuery = true)
    long countSoldItems();

    // Tìm đơn hàng theo khoảng thời gian
    @Query(value = "SELECT oi FROM order_items oi " +
            "JOIN order_details o ON oi.orderDetailId = o.orderDetailId " +
            "WHERE oi.createdAt BETWEEN :beginDate AND :endDate", nativeQuery = true)
    List<OrderItems> findByTime(@Param("beginDate") LocalDateTime beginDate, @Param("endDate") LocalDateTime endDate);

    // Tìm đơn hàng theo tổng tiền
    @Query(value = "SELECT oi.* FROM order_items oi " +
            "JOIN order_details o ON oi.orderDetailId = o.orderDetailId " +
            "WHERE (SELECT SUM(oi.amount) FROM order_items oi WHERE oi.orderDetailId = o.orderDetailId) " +
            "BETWEEN :totalBegin AND :totalEnd", nativeQuery = true)
    List<OrderItems> getOrderByTotalMoney(@Param("totalBegin") BigDecimal totalBegin, @Param("totalEnd") BigDecimal totalEnd);

    // Thống kê số lượng đơn hàng từng ngày trong tháng hiện tại
    @Query(value = "SELECT DAY(o.createdAt) as day, COUNT(oi.orderItemId) as total " +
            "FROM order_items oi " +
            "JOIN order_details o ON oi.orderDetailId = o.orderDetailId " +
            "WHERE MONTH(o.createdAt) = :month AND YEAR(o.createdAt) = :year " +
            "GROUP BY DAY(o.createdAt) " +
            "ORDER BY DAY(o.createdAt) ASC", nativeQuery = true)
    List<Object[]> countOrdersByDay(@Param("month") int month, @Param("year") int year);



    @Query("SELECT SUM(o.amount) FROM OrderItems o WHERE o.createdAt >= :startDate AND o.createdAt <= :endDate")
    BigDecimal getTotalRevenueBetweenDates(LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT COUNT(o) FROM OrderItems o WHERE o.createdAt >= :startDate AND o.createdAt <= :endDate")
    Long getTotalOrdersBetweenDates(LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT COUNT(o) FROM OrderItems o WHERE o.status = :status AND o.createdAt >= :startDate AND o.createdAt <= :endDate")
    Long getTotalOrdersByStatusBetweenDates(OrderItems.ORDER_STATUS status, LocalDateTime startDate, LocalDateTime endDate);


}


//
//package com.example.datn_be.respository;
//
//import com.example.datn_be.entity.OrderItems;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface OrderItemsRepository extends JpaRepository<OrderItems, Integer> {
//
//    // Lấy danh sách OrderItems theo trạng thái
//    List<OrderItems> findByStatus(OrderItems.ORDER_STATUS status);
//
//    OrderItems findByOrderItemId(Integer orderItemId);
//
//    // Thống kê số lượng đơn hàng các tháng theo năm
//    @Query(value = "SELECT MONTH(createdAt) as month, COUNT(orderItemId) as total FROM order_items " +
//            "WHERE YEAR(createdAt) = :year " +
//            "GROUP BY MONTH(createdAt) " +
//            "ORDER BY MONTH(createdAt) ASC", nativeQuery = true)
//    List<Object[]> countOrderByYear(@Param("year") int year);
//
//    // Thống kê doanh thu các tháng
//    @Query(value = "SELECT MONTH(o.createdAt) as month, SUM(oi.quanity * oi.price) as total " +
//            "FROM order_items oi " +
//            "JOIN order_details o ON oi.orderDetailId = o.orderDetailId " +
//            "WHERE YEAR(o.createdAt) = :year " +
//            "GROUP BY MONTH(o.createdAt) " +
//            "ORDER BY MONTH(o.createdAt) ASC", nativeQuery = true)
//    List<Object[]> turnoverByYear(@Param("year") int year);
//
//    // Thống kê số lượng đơn hàng theo khoảng thời gian
//    @Query(value = "SELECT MONTH(o.createdAt) as month, COUNT(oi.orderItemId) as total " +
//            "FROM order_items oi " +
//            "JOIN order_details o ON oi.orderDetailId = o.orderDetailId " +
//            "WHERE o.createdAt BETWEEN :begin AND :end " +
//            "GROUP BY MONTH(o.createdAt) " +
//            "ORDER BY MONTH(o.createdAt) ASC", nativeQuery = true)
//    List<Object[]> countOrderByTime(@Param("begin") String begin, @Param("end") String end);
//
//    // Thống kê số lượng đơn hàng theo trạng thái "Chờ xác nhận"
//    @Query("SELECT COUNT(e.orderItemId) FROM OrderItems e WHERE e.status = 'CHO_XAC_NHAN'")
//    long countByWaitingForConfirmation();
//
//    // Thống kê số lượng đơn hàng theo trạng thái "Đã giao"
//    @Query("SELECT COUNT(e.orderItemId) FROM OrderItems e WHERE e.status = 'DA_GIAO'")
//    long countByDelivered();
//
//    // Thống kê số lượng đơn hàng theo trạng thái "Đã hủy"
//    @Query("SELECT COUNT(e.orderItemId) FROM OrderItems e WHERE e.status = 'DA_HUY'")
//    long countByCanceled();
//
//    // Thống kê số lượng sản phẩm đã bán
//    @Query(value = "SELECT SUM(oi.quanity) " +
//            "FROM order_items oi " +
//            "JOIN order_details o ON oi.orderDetailId = o.orderDetailId " +
//            "WHERE o.refundStatus != 'COMPLETED'", nativeQuery = true)
//    Long countSoldItems();
//
//    // Tìm đơn hàng theo khoảng thời gian
//    @Query(value = "SELECT * FROM order_items oi " +
//            "JOIN order_details o ON oi.orderDetailId = o.orderDetailId " +
//            "WHERE o.createdAt BETWEEN :beginDate AND :endDate", nativeQuery = true)
//    List<OrderItems> findByTime(@Param("beginDate") String beginDate, @Param("endDate") String endDate);
//
//    // Tìm đơn hàng theo tổng tiền
//    @Query(value = "SELECT oi.* FROM order_items oi " +
//            "JOIN order_details o ON oi.orderDetailId = o.orderDetailId " +
//            "WHERE (SELECT SUM(oi.quanity * oi.price) FROM order_items oi WHERE oi.orderDetailId = o.orderDetailId) " +
//            "BETWEEN :totalBegin AND :totalEnd", nativeQuery = true)
//    List<OrderItems> getOrderByTotalMoney(@Param("totalBegin") double totalBegin, @Param("totalEnd") double totalEnd);
//
//    // Thống kê số lượng đơn hàng từng ngày trong tháng hiện tại
//    @Query(value = "SELECT DAY(o.createdAt) as day, COUNT(oi.orderItemId) as total " +
//            "FROM order_items oi " +
//            "JOIN order_details o ON oi.orderDetailId = o.orderDetailId " +
//            "WHERE MONTH(o.createdAt) = :month AND YEAR(o.createdAt) = :year " +
//            "GROUP BY DAY(o.createdAt) " +
//            "ORDER BY DAY(o.createdAt) ASC", nativeQuery = true)
//    List<Object[]> countOrdersByDay(@Param("month") int month, @Param("year") int year);
//}
