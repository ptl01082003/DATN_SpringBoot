package com.example.datn_be.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ConversationsDTO {

    private Integer conversationId;
    private Integer senderId;
    private Integer receiverId;
    private Integer lastMessageId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
