package com.example.datn_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "conversations")
public class Conversations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer conversationId;

    @ManyToOne
    @JoinColumn(name = "senderId")  // Sử dụng tên biến làm tên cột
    private Users senderId;

    @ManyToOne
    @JoinColumn(name = "receiverId")  // Sử dụng tên biến làm tên cột
    private Users receiverId;

    @ManyToOne
    @JoinColumn(name = "lastMessageId")  // Sử dụng tên biến làm tên cột
    private Messages lastMessageId;

    @OneToMany(mappedBy = "conversation")
    private List<Messages> messages;



    }