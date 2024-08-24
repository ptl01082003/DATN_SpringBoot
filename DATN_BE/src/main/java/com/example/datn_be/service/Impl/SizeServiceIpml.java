package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.SizesDTO;
import com.example.datn_be.entity.Sizes;
import com.example.datn_be.respository.SizesRepository;
import com.example.datn_be.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeServiceIpml implements SizeService {

    @Autowired
    private SizesRepository sizesRepository;

    @Override
    public Sizes addSize(SizesDTO sizesDTO) {
        Sizes size = new Sizes();
        size.setName(sizesDTO.getName());
        return sizesRepository.save(size);
    }

    @Override
    public List<Sizes> getSizeList() {
        return sizesRepository.findAll();
    }

    @Override
    public Sizes getById(Integer id) {
        return sizesRepository.findById(id).orElse(null);
    }

    @Override
    public Sizes updateSize(SizesDTO sizesDTO) {
        Sizes size = sizesRepository.findById(sizesDTO.getSizeId()).orElse(null);
        if(size != null){
            size.setName(sizesDTO.getName());
            return sizesRepository.save(size);
        }
        return null;
    }

    @Override
    public boolean deleteSize(Integer id) {
        if(sizesRepository.existsById(id)){
            sizesRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
