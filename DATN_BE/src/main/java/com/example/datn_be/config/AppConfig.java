package com.example.datn_be.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.spring6.templateresolver.SpringResourceTemplateResolver;

import java.util.Properties;

@Configuration
@ConfigurationProperties(prefix = "spring.mail")
public class AppConfig {

    private String host;
    private int port;
    private String username;
    private String password;
    private boolean smtpAuth;
    private boolean starttlsEnable;
    private boolean sslEnable; // Thêm thuộc tính cho SSL

    // Getters and setters for the properties

    @Bean
    public TemplateEngine customTemplateEngine() {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver());
        return templateEngine;
    }

    @Bean
    public SpringResourceTemplateResolver templateResolver() {
        SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
        templateResolver.setPrefix("classpath:/templates/");
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode("HTML");
        return templateResolver;
    }

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("lbeephamthanhlong@gmail.com");
        mailSender.setPassword("nabkjezbuabjbhdb");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.ssl.enable", "false");
        props.put("mail.debug", "true");

        return mailSender;
    }

    // Getters and setters for the properties

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isSmtpAuth() {
        return smtpAuth;
    }

    public void setSmtpAuth(boolean smtpAuth) {
        this.smtpAuth = smtpAuth;
    }

    public boolean isStarttlsEnable() {
        return starttlsEnable;
    }

    public void setStarttlsEnable(boolean starttlsEnable) {
        this.starttlsEnable = starttlsEnable;
    }

    public boolean isSslEnable() {
        return sslEnable;
    }

    public void setSslEnable(boolean sslEnable) {
        this.sslEnable = sslEnable;
    }
}





//
//
//package com.example.datn_be.config;
//
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.JavaMailSenderImpl;
//import org.thymeleaf.TemplateEngine;
//import org.thymeleaf.spring6.SpringTemplateEngine;
//import org.thymeleaf.spring6.templateresolver.SpringResourceTemplateResolver;
//
//import java.util.Properties;
//
//@Configuration
//@ConfigurationProperties(prefix = "spring.mail")
//public class AppConfig {
//
//    private String host;
//    private int port;
//    private String username;
//    private String password;
//    private boolean smtpAuth;
//    private boolean starttlsEnable;
//
//    // Getters and setters for the properties
//
//    @Bean
//    public TemplateEngine customTemplateEngine() {
//        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
//        templateEngine.setTemplateResolver(templateResolver());
//        return templateEngine;
//    }
//
//    @Bean
//    public SpringResourceTemplateResolver templateResolver() {
//        SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
//        templateResolver.setPrefix("classpath:/templates/");
//        templateResolver.setSuffix(".html");
//        templateResolver.setTemplateMode("HTML");
//        return templateResolver;
//    }
//
//    @Bean
//    public JavaMailSender javaMailSender() {
//        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//        mailSender.setHost(host);
//        mailSender.setPort(port);
//        mailSender.setUsername(username);
//        mailSender.setPassword(password);
//
//        Properties props = mailSender.getJavaMailProperties();
//        props.put("mail.transport.protocol", "smtp");
//        props.put("mail.smtp.auth", smtpAuth);
//        props.put("mail.smtp.starttls.enable", starttlsEnable);
//        props.put("mail.debug", "true");
//
//        return mailSender;
//    }
//
//    // Getters and setters for the properties
//
//    public String getHost() {
//        return host;
//    }
//
//    public void setHost(String host) {
//        this.host = host;
//    }
//
//    public int getPort() {
//        return port;
//    }
//
//    public void setPort(int port) {
//        this.port = port;
//    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public boolean isSmtpAuth() {
//        return smtpAuth;
//    }
//
//    public void setSmtpAuth(boolean smtpAuth) {
//        this.smtpAuth = smtpAuth;
//    }
//
//    public boolean isStarttlsEnable() {
//        return starttlsEnable;
//    }
//
//    public void setStarttlsEnable(boolean starttlsEnable) {
//        this.starttlsEnable = starttlsEnable;
//    }
//}
