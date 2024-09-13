package com.example.datn_be.service;

import com.example.datn_be.dto.RolesDTO;

import java.util.List;

public interface RolesService {
    RolesDTO createRole(RolesDTO roleDTO);

    RolesDTO updateRole(RolesDTO roleDTO);

    void deleteRole(Integer roleId);

    RolesDTO getRoleById(Integer roleId);

    List<RolesDTO> getAllRoles();
}
