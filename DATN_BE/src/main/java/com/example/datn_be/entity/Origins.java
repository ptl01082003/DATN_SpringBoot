package com.example.datn_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "origins")
public class Origins {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer originId;

    @Column(nullable = false)
    private String name;

}
