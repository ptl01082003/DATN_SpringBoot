package com.example.datn_be.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MessagesDTO {

    private Integer messagesId;
    private Integer userId;
    private Integer conversationId;
    private String contents;
    private String imageUrl;

}
