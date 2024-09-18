package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.AuthRequest;
import com.example.datn_be.dto.AuthResponse;
import com.example.datn_be.entity.Roles;
import com.example.datn_be.entity.Users;
import com.example.datn_be.respository.UsersRepository;
import com.example.datn_be.service.AuthService;
import com.example.datn_be.utils.ApiResponse;
import com.example.datn_be.utils.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UsersRepository userRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private RedisServiceImpl redisServiceImpl;
    @Qualifier("redisTemplate")
    @Autowired
    private RedisTemplate redisTemplate;


    @Transactional
    @Override
    public ResponseEntity<ApiResponse> register(AuthRequest request) {

        Optional<Users> existingUser = userRepository.findByUserName(request.getUserName());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(ApiResponse.ResponseCode.ERRORS, "Username đã tồn tại"));
        }


        Users newUser = new Users();
        newUser.setFullName(request.getFullName());
        newUser.setPhone(request.getPhone());
        newUser.setEmail(request.getEmail());
        newUser.setUserName(request.getUserName());
        newUser.setPassword(jwtTokenProvider.encodePassword(request.getPassword()));
        userRepository.save(newUser);

        return ResponseEntity.ok(ApiResponse.success(null, "Đăng ký tài khoản thành công"));
    }


    @Transactional
    @Override
    public ResponseEntity<ApiResponse> loginWeb(AuthRequest request) {
        // Tìm người dùng theo tên người dùng
        Optional<Users> userOpt = userRepository.findByUserName(request.getUserName());
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            // Kiểm tra mật khẩu
            if (jwtTokenProvider.checkPassword(request.getPassword(), user.getPassword())) {
                AuthResponse response = new AuthResponse();
                response.setAccessToken(jwtTokenProvider.generateAccessToken(user)); // Tạo token truy cập
                response.setRefreshToken(jwtTokenProvider.generateRefreshToken(user)); // Tạo token làm mới
                return ResponseEntity.ok(ApiResponse.success(response, "Thực hiện thành công"));
            } else {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error(ApiResponse.ResponseCode.ERRORS, "Tài khoản hoặc mật khẩu không đúng"));
            }
        } else {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(ApiResponse.ResponseCode.ERRORS, "Tài khoản không tồn tại"));
        }
    }

    @Transactional
    @Override
    public ResponseEntity<ApiResponse> loginDashboard(AuthRequest request) {
        // Find user by username
        Optional<Users> userOpt = userRepository.findByUserName(request.getUserName());
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            // Check password
            if (jwtTokenProvider.checkPassword(request.getPassword(), user.getPassword())) {
                // Check user role
                if (user.getRoles().getType() == Roles.RoleTypes.USER) {
                    return ResponseEntity.badRequest()
                            .body(ApiResponse.error(ApiResponse.ResponseCode.ERRORS, "Không có quyền truy cập"));
                }

                // Generate access and refresh tokens
                String accessToken = jwtTokenProvider.generateAccessToken(user);
                String refreshToken = jwtTokenProvider.generateRefreshToken(user);

                // Get the role name
                String roleName = user.getRoles().getName();

                // Save user roles to Redis
                redisServiceImpl.saveUserRoles(user.getUserId(), Collections.singleton(roleName));

                // Create response
                AuthResponse response = new AuthResponse();
                response.setAccessToken(accessToken);
                response.setRefreshToken(refreshToken);
                response.setUserId(user.getUserId());

                return ResponseEntity.ok(ApiResponse.success(response, "Thực hiện thành công"));
            } else {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error(ApiResponse.ResponseCode.ERRORS, "Tài khoản hoặc mật khẩu không đúng"));
            }
        } else {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(ApiResponse.ResponseCode.ERRORS, "Tài khoản không tồn tại"));
        }
    }

//    @Transactional
//    @Override
//    public ResponseEntity<ApiResponse> loginDashboard(AuthRequest request) {
//        // Tìm người dùng theo tên người dùng
//        Optional<Users> userOpt = userRepository.findByUserName(request.getUserName());
//        if (userOpt.isPresent()) {
//            Users user = userOpt.get();
//            // Kiểm tra mật khẩu
//            if (jwtTokenProvider.checkPassword(request.getPassword(), user.getPassword())) {
//                // Kiểm tra vai trò người dùng
//                if (user.getRoles().getType() == Roles.RoleTypes.USER) {
//                    return ResponseEntity.badRequest()
//                            .body(ApiResponse.error(ApiResponse.ResponseCode.ERRORS, "Không có quyền truy cập"));
//                }
//                AuthResponse response = new AuthResponse();
//                response.setAccessToken(jwtTokenProvider.generateAccessToken(user)); // Tạo token truy cập
//                response.setRefreshToken(jwtTokenProvider.generateRefreshToken(user)); // Tạo token làm mới
//                response.setUserId(user.getUserId());
//                return ResponseEntity.ok(ApiResponse.success(response, "Thực hiện thành công"));
//            } else {
//                return ResponseEntity.badRequest()
//                        .body(ApiResponse.error(ApiResponse.ResponseCode.ERRORS, "Tài khoản hoặc mật khẩu không đúng"));
//            }
//        } else {
//            return ResponseEntity.badRequest()
//                    .body(ApiResponse.error(ApiResponse.ResponseCode.ERRORS, "Tài khoản không tồn tại"));
//        }
//    }


    @Transactional
    @Override
    public ResponseEntity<ApiResponse> logout(Integer userId) {
        String tokenKey = "user:token:" + userId;
        redisTemplate.delete(tokenKey);
        return ResponseEntity.ok(ApiResponse.success(null, "Thực hiện thành công"));
    }


    @Transactional
    @Override
    public ResponseEntity<ApiResponse> requestRefreshToken(String refreshToken) {
        // Kiểm tra xem refresh token có hợp lệ không
        if (jwtTokenProvider.validateRefreshToken(refreshToken)) {
            // Lấy ID của người dùng từ refresh token
            Integer userId = jwtTokenProvider.getUserIdFromToken(refreshToken);

            // Lấy đối tượng Users từ userId
            Optional<Users> userOpt = userRepository.findById(userId);
            if (userOpt.isPresent()) {
                Users user = userOpt.get();

                // Tạo phản hồi mới chứa access token mới
                AuthResponse response = new AuthResponse();

                response.setAccessToken(jwtTokenProvider.generateAccessToken(user));

                // Trả về phản hồi thành công với token mới
                return ResponseEntity.ok(ApiResponse.success(response, "Thực hiện thành công"));
            } else {

                return ResponseEntity.badRequest()
                        .body(ApiResponse.error(ApiResponse.ResponseCode.ERRORS, "Người dùng không tồn tại"));
            }
        } else {

            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(ApiResponse.ResponseCode.INCORRECT, "Refresh Token không hợp lệ"));
        }
    }
}
