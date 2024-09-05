package com.example.datn_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
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
    @CreatedDate
    @Column(name = "createdAt", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;

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