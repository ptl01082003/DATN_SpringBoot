package com.example.datn_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "reviewers")
public class Reviewers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewerId;

    @Column(name = "stars",nullable = false)
    private Float stars;

    @Column(name = "contents")
    private String contents;

    @Column(name = "productId")
    private Integer productId;

    @ManyToOne
    @JoinColumn(name = "productDetailId")
    private ProductDetails productDetails;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Users users;

    @OneToMany(mappedBy = "reviewers")
    private Set<ReviewerPhoto> reviewerPhotos;


}
