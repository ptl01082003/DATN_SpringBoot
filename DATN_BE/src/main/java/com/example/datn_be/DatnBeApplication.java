package com.example.datn_be;

import com.example.datn_be.utils.LocalDateTimeDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.LocalDateTime;

@EnableJpaAuditing
@SpringBootApplication
public class DatnBeApplication {

    public static void main(String[] args) {
        SpringApplication.run(DatnBeApplication.class, args);


    }


}
