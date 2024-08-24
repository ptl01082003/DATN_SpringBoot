package com.example.datn_be.service;

import com.example.datn_be.dto.SizesDTO;
import com.example.datn_be.entity.Sizes;

import java.util.List;

public interface SizeService {

    Sizes addSize(SizesDTO sizesDTO);
    List<Sizes> getSizeList();
    Sizes getById(Integer id);
    Sizes updateSize(SizesDTO sizesDTO);
    boolean deleteSize(Integer id);
}
