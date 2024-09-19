package com.example.datn_be.service.Impl;

import com.example.datn_be.entity.OrderItems;
import com.example.datn_be.entity.OrderDetails;
import com.example.datn_be.entity.Users;
import com.example.datn_be.respository.OrderDetailsRepository;
import com.example.datn_be.service.ThymeleafService;

import org.xhtmlrenderer.pdf.ITextRenderer;
import org.xhtmlrenderer.pdf.PDFCreationListener;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.transaction.Transactional;
import java.io.*;


    @Slf4j
    @Service
    public class ThymeleafServiceImpl implements ThymeleafService {

        @Autowired
        private JavaMailSender mailSender;

        @Autowired
        private TemplateEngine templateEngine;

        @Override
        @Transactional
        public String generateInvoiceAndSendEmail(OrderItems orderItem) {
            // Lấy thông tin đơn hàng
            Context context = new Context();
            context.setVariable("orderItems", orderItem);
            context.setVariable("orderDetails", orderItem.getOrderDetails());
            context.setVariable("user", orderItem.getOrderDetails().getUsers());

            // Tạo HTML từ Thymeleaf template
            StringWriter writer = new StringWriter();
            try {
                templateEngine.process("invoice_template", context, writer);
            } catch (Exception e) {
                log.error("Failed to process Thymeleaf template", e);
                throw new RuntimeException("Failed to process Thymeleaf template", e);
            }

            String htmlContent = writer.toString();
            log.info("Generated HTML content: \n" + htmlContent); // Debug: In nội dung HTML

            // Tạo PDF từ HTML
            String filePath = "D:/DATN_SpringBoot/DATN_FE/shop_shoes/my-dashboard/Bill/Bill_" + orderItem.getOrderDetails().getOrderCode() + ".pdf";
            try (OutputStream outputStream = new FileOutputStream(filePath)) {
                ITextRenderer renderer = new ITextRenderer();
                renderer.setDocumentFromString(htmlContent);
                renderer.layout();
                renderer.createPDF(outputStream);
            } catch (Exception e) {
                log.error("Failed to generate PDF file", e);
                throw new RuntimeException("Failed to generate PDF file", e);
            }

            // Gửi email
            sendEmail(orderItem, filePath);

            return filePath;
        }


        private void sendEmail(OrderItems orderItem, String filePath) {
            String customerEmail = orderItem.getOrderDetails().getUsers().getEmail();
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            try {
                MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
                messageHelper.setTo(customerEmail);
                messageHelper.setSubject("Hóa đơn cho đơn hàng #" + orderItem.getOrderDetails().getOrderCode());
                messageHelper.setText("Hóa đơn đã được tạo và lưu thành công. Vui lòng kiểm tra hóa đơn đính kèm.", true);

                // Thêm tệp PDF vào email
                File file = new File(filePath);
                messageHelper.addAttachment(file.getName(), file);

                mailSender.send(mimeMessage);
                log.info("Email sent successfully to " + customerEmail);
            } catch (MessagingException e) {
                log.error("Failed to send email to " + customerEmail, e);
                throw new RuntimeException("Failed to send email", e);
            }
        }
    }

//    @Override
//    @Transactional
//    public String generateInvoiceAndSendEmail(OrderItems orderItem) {
//        // Lấy thông tin đơn hàng
//        Context context = new Context();
//        context.setVariable("orderItems", orderItem);
//        context.setVariable("orderDetails", orderItem.getOrderDetails());
//        context.setVariable("user", orderItem.getOrderDetails().getUsers());
//
//        // Tạo HTML từ Thymeleaf template
//        StringWriter writer = new StringWriter();
//        templateEngine.process("invoice_template", context, writer);
//        String htmlContent = writer.toString();
//
//        // Tạo PDF từ HTML
//        String filePath = "D:/DATN_SpringBoot/DATN_FE/shop_shoes/my-dashboard/Bill/Bill_" + orderItem.getOrderDetails().getOrderCode() + ".pdf";
//        try (OutputStream outputStream = new FileOutputStream(filePath)) {
//            ITextRenderer renderer = new ITextRenderer();
//            renderer.setDocumentFromString(htmlContent);
//            renderer.layout();
//            renderer.createPDF(outputStream);
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to generate PDF file", e);
//        }
//
//        // Gửi email
//        sendEmail(orderItem, filePath);
//
//        return filePath;
//    }
//
//    private void sendEmail(OrderItems orderItem, String filePath) {
//        String customerEmail = orderItem.getOrderDetails().getUsers().getEmail();
//        MimeMessage mimeMessage = mailSender.createMimeMessage();
//        try {
//            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
//            messageHelper.setTo(customerEmail);
//            messageHelper.setSubject("Hóa đơn cho đơn hàng #" + orderItem.getOrderDetails().getOrderCode());
//            messageHelper.setText("Hóa đơn đã được tạo và lưu thành công. Vui lòng kiểm tra hóa đơn đính kèm.", true);
//
//            // Thêm tệp PDF vào email
//            File file = new File(filePath);
//            messageHelper.addAttachment(file.getName(), file);
//
//            mailSender.send(mimeMessage);
//        } catch (MessagingException e) {
//            throw new RuntimeException("Failed to send email", e);
//        }
//    }
//}
