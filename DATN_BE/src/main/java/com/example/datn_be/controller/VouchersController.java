package com.example.datn_be.controller;

import com.example.datn_be.dto.VouchersDTO;
import com.example.datn_be.entity.Vouchers;
import com.example.datn_be.service.VouchersService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
@RequestMapping("/api/v1/vouchers")
public class VouchersController {

    @Autowired
    private VouchersService voucherService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<?> addVoucher(@RequestBody VouchersDTO voucherDTO) {
        try {
            VouchersDTO voucher = voucherService.createVoucher(voucherDTO);
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thành công", "data", voucher),
                    HttpStatus.CREATED
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<?> getVouchers() {
        try {
            List<VouchersDTO> vouchers = voucherService.getAllVouchers();
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thành công", "data", vouchers),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @PostMapping("/getById")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<?> getById(@RequestBody Map<String, Integer> request) {
        try {
            Integer voucherId = request.get("voucherId");
            Optional<VouchersDTO> voucher = voucherService.getVoucherById(voucherId);
            if (voucher != null) {
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công", "data", voucher),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        Map.of("message", "Voucher không tồn tại"),
                        HttpStatus.NOT_FOUND
                );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @PostMapping("/edit")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<?> updateVoucher(@RequestBody VouchersDTO voucherDTO) {
        try {
            // Lấy ID từ đối tượng voucherDTO
            Integer voucherId = voucherDTO.getVoucherId();
            // Gọi phương thức updateVoucher của service với voucherId và voucherDTO
            VouchersDTO updatedVoucherDTO = voucherService.updateVoucher(voucherId, voucherDTO);
            if (updatedVoucherDTO != null) {
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công", "data", updatedVoucherDTO),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        Map.of("message", "Voucher không tồn tại"),
                        HttpStatus.NOT_FOUND
                );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }
    private static final Logger logger = LoggerFactory.getLogger(VouchersController.class);

    @PostMapping("/remove")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<Map<String, Object>> deleteVoucher(@RequestParam("voucherId") Integer voucherId) {
        logger.info("Attempting to delete voucher with ID: " + voucherId);
        if (voucherId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "voucherId không được để trống"));
        }
        try {
            boolean isDeleted = voucherService.deleteVoucher(voucherId);
            if (isDeleted) {
                return ResponseEntity.ok(Map.of("message", "Thực hiện thành công"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Voucher không tồn tại"));
            }
        } catch (Exception e) {
            logger.error("Error deleting voucher with ID: " + voucherId, e);
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Thực hiện thất bại", "error", e.getMessage()));
        }
    }

}
