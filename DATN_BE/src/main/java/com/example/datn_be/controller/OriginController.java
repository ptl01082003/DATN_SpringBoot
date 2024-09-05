package com.example.datn_be.controller;

import com.example.datn_be.dto.OriginsDTO;
import com.example.datn_be.entity.Origins;
import com.example.datn_be.service.OriginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/origins")
public class OriginController {

    @Autowired
    private OriginService originService;


    @PostMapping("")
    public ResponseEntity<?> getOrigins(){
        try{
            List<Origins> listOrigin = originService.getOriginsList();
            return  new ResponseEntity<>(
                    Map.of("message","Thực hiện thành công","data",listOrigin),
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
    public ResponseEntity<?> addOrigin(@RequestBody OriginsDTO originsDTO){
        try{
            Origins origins = originService.addOrigin(originsDTO);
            return  new ResponseEntity<>(
                    Map.of("message","Thực hiện thành công","data",origins),
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
    public ResponseEntity<?> getOriginById(@RequestBody  Map<String, Integer> request){
        try{
            Integer originId = request.get("originId");
            Origins origin = originService.getById(originId);
            if(origin != null){
                return new ResponseEntity<>(
                        Map.of("message","Thực hiện thành công","data",origin),
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
    public ResponseEntity<?> updateOrigin(@RequestBody OriginsDTO originsDTO) {
        try {
            Origins origin = originService.updateOrigin(originsDTO);
            if (origin != null) {
                return new ResponseEntity<>(
                        Map.of("message", "Thực hiện thành công", "data", origin),
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
    public ResponseEntity<Map<String, Object>> deleteOrigin(@RequestParam("originId") Integer originId) {
        if (originId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "originId không được để trống"));
        }
        try {
            boolean isDeleted = originService.deleteOrigin(originId);
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
