package com.example.datn_be.service;

import com.example.datn_be.entity.OrderItems;

public interface ThymeleafService {


    String generateInvoiceAndSendEmail(OrderItems orderItem);

}