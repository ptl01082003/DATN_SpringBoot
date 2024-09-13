    package com.example.datn_be.entity;

    import com.fasterxml.jackson.annotation.JsonFormat;
    import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;
    import org.springframework.data.jpa.domain.support.AuditingEntityListener;


    import java.time.LocalDate;
    import java.time.LocalDateTime;
    import java.util.Random;

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Entity
    @Table(name = "users")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @EntityListeners(AuditingEntityListener.class)
    public class Users {

        public enum UserStatus {
            LAM_VIEC,
            NGHI_VIEC,
        }


        @Id
        @Column(name = "userId", nullable = false)
        private Integer userId;

        @Column(name = "userName", nullable = false)
        private String userName;

        @Column(name = "email", nullable = false, unique = true)
        private String email;

        @Column(name = "phone")
        private String phone;

        @Column(name = "password", nullable = false)
        private String password;

        @Column(name = "birth")
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate birth;  // Changed from LocalDateTime to LocalDate

        @Column(name = "fullName", nullable = false)
        private String fullName;

        @Column(name = "status", nullable = false)
        private UserStatus status;

        @Column(name = "createdAt")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createdAt;

        @Column(name = "updatedAt")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime updatedAt;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "roleId")
        private Roles roles;

        @PrePersist
        public void prePersist() {
            if (this.userId == null) {
                this.userId = generateUserId();
            }
        }

        private Integer generateUserId() {
            Random random = new Random();
            return 1031500000 + random.nextInt(10000000);
        }

        public Integer getRoleId() {
            return this.roles != null ? this.roles.getRoleId() : null;
        }
    }


