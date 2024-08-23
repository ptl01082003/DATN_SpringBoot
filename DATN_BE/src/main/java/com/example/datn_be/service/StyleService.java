package com.example.datn_be.service;

import com.example.datn_be.dto.MaterialsDTO;
import com.example.datn_be.dto.StylesDTO;
import com.example.datn_be.entity.Materials;
import com.example.datn_be.entity.Styles;

import java.util.List;

public interface StyleService {
    Styles addStyles(StylesDTO stylesDTO);
    List<Styles> getStyle();
    Styles getById(Integer styleId);
    Styles updateStyle(StylesDTO stylesDTO);
    boolean deleteStyle(Integer StyleId);
}
