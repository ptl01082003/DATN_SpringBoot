//package com.example.datn_be.service.Impl;
//
//import com.example.datn_be.entity.OrderItems;
//import com.example.datn_be.entity.OrderDetails;
//import com.example.datn_be.respository.OrderDetailsRepository;
//import com.example.datn_be.service.ThymeleafService;
//import com.itextpdf.html2pdf.HtmlConverter;
//import com.itextpdf.kernel.pdf.PdfDocument;
//import com.itextpdf.kernel.pdf.PdfWriter;
//import jakarta.mail.MessagingException;
//import jakarta.mail.internet.MimeMessage;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.stereotype.Service;
//import org.thymeleaf.TemplateEngine;
//import org.thymeleaf.context.Context;
//
//import javax.transaction.Transactional;
//import java.io.*;
//
//@Slf4j
//    @Service
//    public class ThymeleafServiceImpl implements ThymeleafService {
//
//        @Autowired
//        private OrderDetailsRepository orderDetailsRepository;
//
//        @Autowired
//        private JavaMailSender mailSender;
//
//        @Autowired
//        private TemplateEngine templateEngine;
//
//        @Override
//        @Transactional
//        public String generateInvoiceAndSendEmail(OrderItems orderItem) {
//            // Lấy thông tin đơn hàng
//            OrderDetails orderDetails = orderDetailsRepository.findById(orderItem.getOrderDetails().getOrderDetailId())
//                    .orElseThrow(() -> new RuntimeException("Order not found"));
//
//            // Tạo context Thymeleaf
//            Context context = new Context();
//            context.setVariable("orderDetails", orderDetails);
//            context.setVariable("orderItems", orderItem);
////            context.setVariable("userName", orderDetails.getUsers().getUserName());
//
//            // Tạo hóa đơn dưới dạng String
//            StringWriter writer = new StringWriter();
//            templateEngine.process("invoice_template", context, writer);
//            String invoiceHtml = writer.toString();
//
//            // Lưu hóa đơn dưới dạng PDF
//            String fileName = "Bill_" + orderDetails.getOrderCode() + ".pdf";
//            String filePath = "D:/DATN_SpringBoot/DATN_FE/shop_shoes/my-dashboard/Bill/" + fileName;
//
//            try (OutputStream outputStream = new FileOutputStream(filePath)) {
//                PdfWriter pdfWriter = new PdfWriter(outputStream);
//                PdfDocument pdfDocument = new PdfDocument(pdfWriter);
//                HtmlConverter.convertToPdf(invoiceHtml, pdfDocument.getWriter());
//                pdfDocument.close();
//            } catch (Exception e) {
//                e.printStackTrace();
//                throw new RuntimeException("Failed to save PDF file", e);
//            }
//
//            // Gửi email
//            MimeMessage mimeMessage = mailSender.createMimeMessage();
//            try {
//                MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
//                messageHelper.setTo(orderDetails.getUsers().getEmail()); // Email khách hàng
//                messageHelper.setSubject("Hóa đơn cho đơn hàng #" + orderDetails.getOrderCode());
//                messageHelper.setText("Hóa đơn đã được tạo và lưu thành công. Vui lòng kiểm tra hóa đơn đính kèm.", true); // true để gửi dưới dạng HTML
//                log.info("Email đã được gửi đến: {}", orderDetails.getUsers().getEmail());
//                // Thêm tệp PDF vào email
//                File file = new File(filePath);
//                messageHelper.addAttachment(file.getName(), file);
//
//                mailSender.send(mimeMessage);
//            } catch (MessagingException e) {
//                e.printStackTrace();
//                log.error("Gửi email không thành công: ", e);
//                throw new RuntimeException("Failed to send email", e);
//            }
//            return invoiceHtml;
//        }
//    }

package com.example.datn_be.service.Impl;

import com.example.datn_be.entity.OrderItems;
import com.example.datn_be.entity.OrderDetails;
import com.example.datn_be.respository.OrderDetailsRepository;
import com.example.datn_be.service.ThymeleafService;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
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
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Override
    @Transactional
    public String generateInvoiceAndSendEmail(OrderItems orderItem) {
        // Lấy thông tin đơn hàng
        OrderDetails orderDetails = orderDetailsRepository.findById(orderItem.getOrderDetails().getOrderDetailId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Tạo context Thymeleaf
        Context context = new Context();
        context.setVariable("orderDetails", orderDetails);
        context.setVariable("orderItems", orderItem);

        // Tạo hóa đơn dưới dạng String
        StringWriter writer = new StringWriter();
        templateEngine.process("invoice_template", context, writer);
        String invoiceHtml = writer.toString();

        // Lưu hóa đơn dưới dạng PDF
        String fileName = "Bill_" + orderDetails.getOrderCode() + ".pdf";
        String filePath = "D:/DATN_SpringBoot/DATN_FE/shop_shoes/my-dashboard/Bill/" + fileName;

        try (OutputStream outputStream = new FileOutputStream(filePath)) {
            PdfWriter pdfWriter = new PdfWriter(outputStream);
            PdfDocument pdfDocument = new PdfDocument(pdfWriter);
            HtmlConverter.convertToPdf(invoiceHtml, pdfDocument.getWriter());
            pdfDocument.close();
            log.info("Hóa đơn đã được lưu thành công: {}", filePath);
        } catch (Exception e) {
            log.error("Lưu PDF không thành công: ", e);
            throw new RuntimeException("Failed to save PDF file", e);
        }

        // Gửi email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
            messageHelper.setTo(orderDetails.getUsers().getEmail()); // Email khách hàng
            messageHelper.setSubject("Hóa đơn cho đơn hàng #" + orderDetails.getOrderCode());
            messageHelper.setText("Hóa đơn đã được tạo và lưu thành công. Vui lòng kiểm tra hóa đơn đính kèm.", true); // true để gửi dưới dạng HTML

            // Thêm tệp PDF vào email
            File file = new File(filePath);
            messageHelper.addAttachment(file.getName(), file);

            mailSender.send(mimeMessage);
            log.info("Email đã được gửi đến: {}", orderDetails.getUsers().getEmail());
        } catch (MessagingException e) {
            log.error("Gửi email không thành công: ", e);
            throw new RuntimeException("Failed to send email", e);
        }
        return invoiceHtml;
    }
}


//    @Override
//    @Transactional
//    public String generateInvoiceAndSendEmail(OrderItems orderItem) {
//        // Lấy thông tin đơn hàng
//        OrderDetails orderDetails = orderDetailsRepository.findById(orderItem.getOrderDetails().getOrderDetailId())
//                .orElseThrow(() -> new RuntimeException("Order not found"));
//
//        // Tạo context Thymeleaf
//        Context context = new Context();
//        context.setVariable("orderDetails", orderDetails);
//        context.setVariable("orderItems", orderItem);
//
//        // Tạo hóa đơn dưới dạng String
//        StringWriter writer = new StringWriter();
//        templateEngine.process("invoice_template", context, writer);
//        String invoiceHtml = writer.toString();
//
//        // Lưu hóa đơn dưới dạng PDF
//        String fileName = "Bill_" + orderDetails.getOrderCode() + ".pdf";
//        String filePath = "D:/DATN_SpringBoot/DATN_FE/shop_shoes/my-dashboard/Bill/" + fileName;
//
//        try (OutputStream outputStream = new FileOutputStream(filePath)) {
//            PdfWriter pdfWriter = new PdfWriter(outputStream);
//            PdfDocument pdfDocument = new PdfDocument(pdfWriter);
//            HtmlConverter.convertToPdf(invoiceHtml, pdfDocument.getWriter());
//            pdfDocument.close();
//            log.info("Hóa đơn đã được lưu thành công: {}", filePath);
//        } catch (Exception e) {
//            log.error("Lưu PDF không thành công: ", e);
//            throw new RuntimeException("Failed to save PDF file", e);
//        }
//
//        // Gửi email
//        MimeMessage mimeMessage = mailSender.createMimeMessage();
//        try {
//            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
//            messageHelper.setTo(orderDetails.getUsers().getEmail()); // Email khách hàng
//            messageHelper.setSubject("Hóa đơn cho đơn hàng #" + orderDetails.getOrderCode());
//            messageHelper.setText("Hóa đơn đã được tạo và lưu thành công. Vui lòng kiểm tra hóa đơn đính kèm.", true); // true để gửi dưới dạng HTML
//
//            // Thêm tệp PDF vào email
//            File file = new File(filePath);
//            messageHelper.addAttachment(file.getName(), file);
//
//            mailSender.send(mimeMessage);
//            log.info("Email đã được gửi đến: {}", orderDetails.getUsers().getEmail());
//        } catch (MessagingException e) {
//            log.error("Gửi email không thành công: ", e);
//            throw new RuntimeException("Failed to send email", e);
//        }
//        return invoiceHtml;
//    }
//}
