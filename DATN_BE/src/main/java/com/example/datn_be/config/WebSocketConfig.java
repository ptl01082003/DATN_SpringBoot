//package com.example.datn_be.config;
//
//import com.example.datn_be.config.security.JwtWebSocketInterceptor;
//import com.example.datn_be.config.security.MyWebSocketHandler;
//import com.example.datn_be.service.RedisService;
//import com.example.datn_be.utils.JwtTokenProvider;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.socket.config.annotation.EnableWebSocket;
//import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
//import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
//
//@Configuration
//@EnableWebSocket
//public class WebSocketConfig implements WebSocketConfigurer {
//
//    private final JwtWebSocketInterceptor jwtWebSocketInterceptor;
//
//    public WebSocketConfig(JwtWebSocketInterceptor jwtWebSocketInterceptor) {
//        this.jwtWebSocketInterceptor = jwtWebSocketInterceptor;
//    }
//
//    @Override
//    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//        registry.addHandler(new MyWebSocketHandler(), "/ws/my-endpoint")
//                .addInterceptors(jwtWebSocketInterceptor)
//                .setAllowedOrigins("http://localhost:3000");
//    }
//
//    @Bean
//    public JwtWebSocketInterceptor jwtWebSocketInterceptor(JwtTokenProvider jwtTokenProvider, RedisService redisService) {
//        return new JwtWebSocketInterceptor(jwtTokenProvider, redisService);
//    }
//}
