package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.OriginsDTO;
import com.example.datn_be.entity.Origins;
import com.example.datn_be.respository.OriginsRepository;
import com.example.datn_be.service.OriginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OriginServiceImpl implements OriginService {

    @Autowired
    private OriginsRepository originsRepository;

    @Override
    public Origins addOrigin(OriginsDTO originsDTO) {
        Origins origin = new Origins();
        origin.setName(originsDTO.getName());
        return originsRepository.save(origin);
    }

    @Override
    public List<Origins> getOriginsList() {
        return originsRepository.findAll();
    }

    @Override
    public Origins getById(Integer id) {
        return originsRepository.findById(id).orElse(null);
    }

    @Override
    public Origins updateOrigin(OriginsDTO originsDTO) {
        Origins origins = originsRepository.findById(originsDTO.getOriginId()).orElse(null);
        if(origins != null){
            origins.setName(originsDTO.getName());
            return originsRepository.save(origins);
        }
        return null;
    }

    @Override
    public boolean deleteOrigin(Integer id) {
        if(originsRepository.existsById(id)){
            originsRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
