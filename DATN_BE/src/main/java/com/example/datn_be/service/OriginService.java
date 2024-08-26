package com.example.datn_be.service;

import com.example.datn_be.dto.OriginsDTO;
import com.example.datn_be.entity.Origins;

import java.util.List;

public interface OriginService {

    Origins addOrigin(OriginsDTO originsDTO);
    List<Origins> getOriginsList();
    Origins getById(Integer id);
    Origins updateOrigin(OriginsDTO originsDTO);
    boolean deleteOrigin(Integer id);

}
