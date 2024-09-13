package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.MaterialsDTO;
import com.example.datn_be.entity.Materials;
import com.example.datn_be.respository.MaterialsRepository;
import com.example.datn_be.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialSeviceImpl implements MaterialService {
    @Autowired
    MaterialsRepository materialsRepository;


    @Override
    public Materials addMaterials(MaterialsDTO materialsDTO) {
        Materials materials= new Materials();
        materials.setName(materialsDTO.getName());
        return materialsRepository.save(materials);
    }

    @Override
    public List<Materials> getMaterials() {
        return materialsRepository.findAll();
    }

    @Override
    public Materials getById(Integer materialId) {
        return materialsRepository.findById(materialId).orElse(null);
    }

    @Override
    public Materials updateMaterial(MaterialsDTO materialsDTO) {
        Materials materials =materialsRepository.findById(materialsDTO.getMaterialId()).orElse(null);
        if (materials!=null){
            materials.setName(materialsDTO.getName());
            return materialsRepository.save(materials);
        }
        return null;
    }

    @Override
    public boolean deleteMaterial(Integer materialId) {
        if (materialsRepository.existsById(materialId)){
            materialsRepository.deleteById(materialId);
            return true;
        }
        return false;
    }
}
