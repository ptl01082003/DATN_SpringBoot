package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.MaterialsDTO;
import com.example.datn_be.dto.StylesDTO;
import com.example.datn_be.entity.Materials;
import com.example.datn_be.entity.Styles;
import com.example.datn_be.respository.StylesRepository;
import com.example.datn_be.service.StyleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class StyleServiceImpl implements StyleService {

    @Autowired
    StylesRepository stylesRepository;

    @Override
    public Styles addStyles(StylesDTO stylesDTO) {
        Styles styles= new Styles();
        styles.setName(stylesDTO.getName());
        return stylesRepository.save(styles);
    }

    @Override
    public List<Styles> getStyle() {
        return stylesRepository.findAll();
    }

    @Override
    public Styles getById(Integer styleId) {
        return stylesRepository.findById(styleId).orElse(null);
    }

    @Override
    public Styles updateStyle(StylesDTO stylesDTO) {
            Styles styles =stylesRepository.findById(stylesDTO.getStyleId()).orElse(null);
            if (styles!=null){
                styles.setName(stylesDTO.getName());
                return stylesRepository.save(styles);
            }
            return null;
    }

    @Override
    public boolean deleteStyle(Integer styleId) {
            if (stylesRepository.existsById(styleId)){
                stylesRepository.deleteById(styleId);
                return true;
            }
            return false;
        }
    }

