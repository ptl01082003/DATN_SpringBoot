package com.example.datn_be.config.security;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;

public class MyWebSocketHandler extends TextWebSocketHandler {

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        // Xử lý tin nhắn từ client
        String payload = message.getPayload();
        System.out.println("Received message: " + payload);
        // Gửi phản hồi nếu cần
        session.sendMessage(new TextMessage("Server response: " + payload));
    }
}
