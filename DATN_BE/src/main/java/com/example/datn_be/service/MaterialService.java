package com.example.datn_be.service;


import com.example.datn_be.dto.MaterialsDTO;
import com.example.datn_be.entity.Materials;
import java.util.List;

public interface MaterialService {
    Materials addMaterials(MaterialsDTO materialsDTO);
    List<Materials> getMaterials();
    Materials getById(Integer materialId);
    Materials updateMaterial(MaterialsDTO materialsDTO);
    boolean deleteMaterial(Integer materialId);
}
