package com.example.datn_be.controller;

import com.example.datn_be.dto.SizesDTO;
import com.example.datn_be.entity.Sizes;
import com.example.datn_be.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/sizes")
public class SizeController {

    @Autowired
    private SizeService sizeService;


    @PostMapping("")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<?> getSizes(){
        try{
            List<Sizes> listSize = sizeService.getSizeList();
            return  new ResponseEntity<>(
                    Map.of("message","Thực hiện thành công","data",listSize),
                    HttpStatus.OK
            );
        }catch (Exception e){
            return  new ResponseEntity<>(
                    Map.of("message","Thực hiện thất bại","erro",e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }


    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<?> addSize(@RequestBody SizesDTO sizesDTO){
        try{
            Sizes size = sizeService.addSize(sizesDTO);
            return  new ResponseEntity<>(
                    Map.of("message","Thực hiện thành công","data",size),
                    HttpStatus.OK
            );
        }catch (Exception e){
            return  new ResponseEntity<>(
                    Map.of("message","Thực hiện thất bại","erro",e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }


    @PostMapping("/getById")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<?> getSizeById(@RequestBody  Map<String, Integer> request){
        try{
            Integer sizeId = request.get("sizeId");
            Sizes size = sizeService.getById(sizeId);
            if(size != null){
                return new ResponseEntity<>(
                        Map.of("message","Thực hiện thành công","data",size),
                        HttpStatus.OK
                );
            }else {
                return new ResponseEntity<>(
                        Map.of("message", "Xuất xứ không tồn tại"),
                        HttpStatus.NOT_FOUND
                );
            }
        }catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }


    @PostMapping("/edit")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<?> updateSize(@RequestBody SizesDTO sizesDTO) {
        try {
            Sizes size = sizeService.updateSize(sizesDTO);
            if (size != null) {
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công", "data", size),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        Map.of("message", "Thương hiệu không tồn tại"),
                        HttpStatus.NOT_FOUND
                );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("message", "Thực hiện thất bại", "error", e.getMessage()),
                    HttpStatus.BAD_REQUEST
            );
        }
    }


    @PostMapping("/remove")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBERSHIP')")
    public ResponseEntity<Map<String, Object>> deleteSize(@RequestParam("sizeId") Integer sizeId) {
        if (sizeId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "sizeId không được để trống"));
        }
        try {
            boolean isDeleted = sizeService.deleteSize(sizeId);
            if (isDeleted) {
                return ResponseEntity.ok(Map.of("message", "Thực hiện thành công"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Thương hiệu không tồn tại"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Thực hiện thất bại", "error", e.getMessage()));
        }
    }
}
