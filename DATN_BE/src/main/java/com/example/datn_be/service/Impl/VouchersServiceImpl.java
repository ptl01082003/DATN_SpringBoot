package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.VouchersDTO;
import com.example.datn_be.entity.Vouchers;
import com.example.datn_be.respository.VouchersRepository;
import com.example.datn_be.service.VouchersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VouchersServiceImpl implements VouchersService {

    @Autowired
    private VouchersRepository vouchersRepository;

    @Override
    public VouchersDTO createVoucher(VouchersDTO vouchersDTO) {
        Vouchers voucher = new Vouchers();
        // Chuyển đổi từ DTO sang Entity
        voucher.setCode(vouchersDTO.getCode());
        voucher.setDescription(vouchersDTO.getDescription());
        voucher.setValueOrder(vouchersDTO.getValueOrder());
        voucher.setDiscountMax(vouchersDTO.getDiscountMax());
        voucher.setStartDay(vouchersDTO.getStartDay());
        voucher.setEndDay(vouchersDTO.getEndDay());
        voucher.setDiscountValue(vouchersDTO.getDiscountValue());
        voucher.setQuantity(vouchersDTO.getQuantity());
        voucher.setStatus(vouchersDTO.getStatus());
        voucher.setTypeValue(Vouchers.VouchersType.PERCENT);  // Chỉ sử dụng PERCENT
        voucher.setRuleType(vouchersDTO.getRuleType());
        voucher.setMinOrderValue(vouchersDTO.getMinOrderValue());
        voucher.setMinOrderCount(vouchersDTO.getMinOrderCount());
        voucher.setMaxOrderCount(vouchersDTO.getMaxOrderCount());

        Vouchers savedVoucher = vouchersRepository.save(voucher);
        // Chuyển đổi từ Entity sang DTO
        return convertToDTO(savedVoucher);
    }

    @Override
    public Optional<VouchersDTO> getVoucherById(Integer voucherId) {
        Optional<Vouchers> voucher = vouchersRepository.findById(voucherId);
        return voucher.map(this::convertToDTO);
    }

    @Override
    public List<VouchersDTO> getAllVouchers() {
        List<Vouchers> vouchers = vouchersRepository.findAll();
        return vouchers.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public VouchersDTO updateVoucher(Integer voucherId, VouchersDTO vouchersDTO) {
        Optional<Vouchers> optionalVoucher = vouchersRepository.findById(voucherId);
        if (optionalVoucher.isPresent()) {
            Vouchers voucher = optionalVoucher.get();
            // Cập nhật thông tin của voucher
            voucher.setCode(vouchersDTO.getCode());
            voucher.setDescription(vouchersDTO.getDescription());
            voucher.setValueOrder(vouchersDTO.getValueOrder());
            voucher.setDiscountMax(vouchersDTO.getDiscountMax());
            voucher.setStartDay(vouchersDTO.getStartDay());
            voucher.setEndDay(vouchersDTO.getEndDay());
            voucher.setDiscountValue(vouchersDTO.getDiscountValue());
            voucher.setQuantity(vouchersDTO.getQuantity());
            voucher.setStatus(vouchersDTO.getStatus());
            voucher.setTypeValue(Vouchers.VouchersType.PERCENT);  // Chỉ sử dụng PERCENT
            voucher.setRuleType(vouchersDTO.getRuleType());
            voucher.setMinOrderValue(vouchersDTO.getMinOrderValue());
            voucher.setMinOrderCount(vouchersDTO.getMinOrderCount());
            voucher.setMaxOrderCount(vouchersDTO.getMaxOrderCount());

            Vouchers updatedVoucher = vouchersRepository.save(voucher);
            return convertToDTO(updatedVoucher);
        }
        return null;
    }

    @Override
    public boolean deleteVoucher(Integer voucherId) {
        if (vouchersRepository.existsById(voucherId)) {
            vouchersRepository.deleteById(voucherId);
            return true;
        }
        return false;
    }

    private VouchersDTO convertToDTO(Vouchers voucher) {
        VouchersDTO dto = new VouchersDTO();
        dto.setVoucherId(voucher.getVoucherId());
        dto.setCode(voucher.getCode());
        dto.setDescription(voucher.getDescription());
        dto.setValueOrder(voucher.getValueOrder());
        dto.setDiscountMax(voucher.getDiscountMax());
        dto.setStartDay(voucher.getStartDay());
        dto.setEndDay(voucher.getEndDay());
        dto.setDiscountValue(voucher.getDiscountValue());
        dto.setQuantity(voucher.getQuantity());
        dto.setStatus(voucher.getStatus());
        dto.setTypeValue(Vouchers.VouchersType.PERCENT);  // Chỉ sử dụng PERCENT
        dto.setRuleType(voucher.getRuleType());
        dto.setMinOrderValue(voucher.getMinOrderValue());
        dto.setMinOrderCount(voucher.getMinOrderCount());
        dto.setMaxOrderCount(voucher.getMaxOrderCount());
        return dto;
    }
}
