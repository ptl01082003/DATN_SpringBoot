package com.example.datn_be.service.Impl;

import com.example.datn_be.dto.UsersDTO;
import com.example.datn_be.entity.Roles;
import com.example.datn_be.entity.Users;
import com.example.datn_be.respository.RolesRepository;
import com.example.datn_be.respository.UsersRepository;
import com.example.datn_be.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final RolesRepository rolesRepository;

    @Autowired
    public UserServiceImpl(UsersRepository usersRepository, @Lazy PasswordEncoder passwordEncoder, RolesRepository rolesRepository) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.rolesRepository = rolesRepository;
    }

    @Override
    public UsersDTO getUserInfo(Integer userId) {
        log.debug("Fetching user info for userId: {}", userId);

        Users user = usersRepository.findByUserId(userId);
        if (user == null) {
            log.warn("User not found for userId: {}", userId);
            return null;
        }

        return convertToDto(user);
    }

    @Override
    public List<UsersDTO> getAllUsers() {
        return usersRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UsersDTO getUserById(Integer userId) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDto(user);
    }

    @Override
    public UsersDTO createUser(UsersDTO userDto) {
        // Validate input fields
        validateUserDto(userDto);

        Optional<Users> existingUserName = usersRepository.findByUserName(userDto.getUserName());
        if (existingUserName.isPresent()) {
            throw new IllegalArgumentException("Người dùng đã tồn tại");
        }

        Optional<Users> existingUserEmail = Optional.ofNullable(usersRepository.findByEmail(userDto.getEmail()));
        if (existingUserEmail.isPresent()) {
            throw new IllegalArgumentException("Email đã tồn tại");
        }

        Users user = new Users();
        user.setUserName(userDto.getUserName());
        user.setEmail(userDto.getEmail());
        user.setPhone(userDto.getPhone());
        user.setPassword(passwordEncoder.encode(userDto.getPassword())); // Encode password
        user.setFullName(userDto.getFullName());
        user.setStatus(Users.UserStatus.valueOf(userDto.getStatus())); // Convert string to enum
        user.setBirth(userDto.getBirth());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        if (userDto.getRoleId() != null) {
            Roles role = rolesRepository.findById(userDto.getRoleId())
                    .orElseThrow(() -> new IllegalArgumentException("Vai trò không hợp lệ"));
            user.setRoles(role);
        } else {
            user.setRoles(null); // Ensure roles are null if not provided
        }

        Users savedUser = usersRepository.save(user);
        return convertToDto(savedUser);
    }

    @Override
    public UsersDTO updateUser(Integer userId, UsersDTO userDto) {
        validateUserDto(userDto);

        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        user.setUserName(userDto.getUserName());
        user.setEmail(userDto.getEmail());
        user.setPhone(userDto.getPhone());
        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }
        user.setFullName(userDto.getFullName());
        user.setStatus(Users.UserStatus.valueOf(userDto.getStatus()));
        user.setBirth(userDto.getBirth());
        user.setUpdatedAt(LocalDateTime.now());

        if (userDto.getRoleId() != null) {
            Roles role = rolesRepository.findById(userDto.getRoleId())
                    .orElseThrow(() -> new IllegalArgumentException("Vai trò không hợp lệ"));
            user.setRoles(role);
        } else {
            user.setRoles(null);
        }

        Users updatedUser = usersRepository.save(user);
        return convertToDto(updatedUser);
    }

    @Override
    public void deleteUser(Integer userId) {
        if (!usersRepository.existsById(userId)) {
            throw new RuntimeException("Người dùng không tồn tại");
        }
        usersRepository.deleteById(userId);
    }

    private UsersDTO convertToDto(Users user) {
        UsersDTO userDto = new UsersDTO();
        userDto.setUserId(user.getUserId());
        userDto.setUserName(user.getUserName());
        userDto.setEmail(user.getEmail());
        userDto.setPhone(user.getPhone());
        userDto.setPassword(user.getPassword());
        userDto.setFullName(user.getFullName());
        userDto.setStatus(user.getStatus() != null ? user.getStatus().name() : null);
        userDto.setBirth(user.getBirth());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setUpdatedAt(user.getUpdatedAt());

        if (user.getRoles() != null) {
            userDto.setRoles(user.getRoles().getName());
            userDto.setRoleId(user.getRoles().getRoleId());
        } else {
            userDto.setRoles(null);
            userDto.setRoleId(null);
        }

        return userDto;
    }

    private void validateUserDto(UsersDTO userDto) {
        if (userDto.getUserName() == null || userDto.getUserName().isEmpty()) {
            throw new IllegalArgumentException("Tên người dùng không được để trống");
        }
        if (userDto.getEmail() == null || userDto.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email không được để trống");
        }
        if (userDto.getPassword() == null || userDto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Mật khẩu không được để trống");
        }
    }
}
