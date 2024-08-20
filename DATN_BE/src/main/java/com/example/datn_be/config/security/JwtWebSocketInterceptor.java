//package com.example.datn_be.config.security;
//
//import com.example.datn_be.utils.JwtTokenProvider;
//import com.example.datn_be.service.RedisService;
//import org.springframework.web.socket.WebSocketHandler;
//import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.util.Map;
//
//public class JwtWebSocketInterceptor extends HttpSessionHandshakeInterceptor {
//
//    private final JwtTokenProvider jwtTokenProvider;
//    private final RedisService redisService;
//
//    public JwtWebSocketInterceptor(JwtTokenProvider jwtTokenProvider, RedisService redisService) {
//        this.jwtTokenProvider = jwtTokenProvider;
//        this.redisService = redisService;
//    }
//
//    @Override
//    public boolean beforeHandshake(HttpServletRequest request, HttpServletResponse response,
//                                   WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
//        String token = request.getParameter("token");
//
//        if (token != null && jwtTokenProvider.validateToken(token)) {
//            Integer userId = jwtTokenProvider.getUserIdFromJWT(token);
//            String tokenInRedis = redisService.getValue("accessToken-" + userId);
//            if (tokenInRedis != null && tokenInRedis.equals(token)) {
//                attributes.put("userId", userId);
//                return true;
//            }
//        }
//        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
//        return false;
//    }
//
//    @Override
//    public void afterHandshake(HttpServletRequest request, HttpServletResponse response,
//                               WebSocketHandler wsHandler, Exception exception) {
//        // No action needed after handshake
//    }
//}
