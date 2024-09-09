package com.example.datn_be.config.security;

import com.example.datn_be.dto.UsersDTO;
import com.example.datn_be.service.UserService;
import com.example.datn_be.utils.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Collections;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider, UserService userService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)


            throws ServletException, IOException {

        String path = request.getRequestURI();
        log.debug("Processing request: {}", path);

        if (path.startsWith("/api/v1/")) {
            log.debug("Skipping authentication for public endpoint: {}", path);
            filterChain.doFilter(request, response);
            return;
        }

        String token = getJwtFromRequest(request);

        if (token != null && jwtTokenProvider.validateToken(token)) {
            Integer userId = jwtTokenProvider.getUserIdFromToken(token);

            // Lấy thông tin người dùng từ dịch vụ
            UsersDTO user = userService.getUserInfo(userId);

            if (user != null) {
                // Tạo đối tượng Authentication từ thông tin người dùng
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        user.getUserName(), null,
                        user.getRoles() != null ? user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role)).collect(Collectors.toList()) : Collections.emptyList()
                );
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Thiết lập SecurityContext hiện tại
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
