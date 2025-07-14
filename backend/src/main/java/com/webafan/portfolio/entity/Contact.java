package com.webafan.portfolio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "contacts")
public class Contact {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    @Column(name = "name", nullable = false, length = 100)
    private String name;
    
    @Email(message = "Email should be valid")
    @Size(max = 150, message = "Email must not exceed 150 characters")
    @Column(name = "email", length = 150)
    private String email;
    
    @NotBlank(message = "Subject is required")
    @Size(max = 200, message = "Subject must not exceed 200 characters")
    @Column(name = "subject", nullable = false, length = 200)
    private String subject;
    
    @NotBlank(message = "Message is required")
    @Size(max = 2000, message = "Message must not exceed 2000 characters")
    @Column(name = "message", nullable = false, length = 2000)
    private String message;
    
    @Column(name = "whatsapp_sent", nullable = false)
    private Boolean whatsappSent = false;
    
    @Column(name = "email_sent", nullable = false)
    private Boolean emailSent = false;
    
    @Column(name = "contact_method", length = 20)
    private String contactMethod = "whatsapp";
    
    @Column(name = "phone_number", length = 20)
    private String phoneNumber;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public Contact() {
        this.createdAt = LocalDateTime.now();
    }
    
    public Contact(String name, String email, String subject, String message) {
        this();
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }
    
    // Lifecycle callbacks
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getSubject() {
        return subject;
    }
    
    public void setSubject(String subject) {
        this.subject = subject;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public Boolean getWhatsappSent() {
        return whatsappSent;
    }
    
    public void setWhatsappSent(Boolean whatsappSent) {
        this.whatsappSent = whatsappSent;
    }
    
    public Boolean getEmailSent() {
        return emailSent;
    }
    
    public void setEmailSent(Boolean emailSent) {
        this.emailSent = emailSent;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public String getContactMethod() {
        return contactMethod;
    }
    
    public void setContactMethod(String contactMethod) {
        this.contactMethod = contactMethod;
    }
    
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    @Override
    public String toString() {
        return "Contact{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", subject='" + subject + '\'' +
                ", contactMethod='" + contactMethod + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", whatsappSent=" + whatsappSent +
                ", emailSent=" + emailSent +
                ", createdAt=" + createdAt +
                '}';
    }
}