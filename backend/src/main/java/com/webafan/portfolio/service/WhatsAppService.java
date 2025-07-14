package com.webafan.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
public class WhatsAppService {
    
    private static final Logger logger = LoggerFactory.getLogger(WhatsAppService.class);
    
    @Value("${whatsapp.api.url}")
    private String apiUrl;
    
    @Value("${whatsapp.api.token}")
    private String apiToken;
    
    @Value("${whatsapp.api.sender}")
    private String senderNumber;
    
    private final RestTemplate restTemplate;
    
    public WhatsAppService() {
        this.restTemplate = new RestTemplate();
    }
    
    public boolean sendContactFormMessage(String name, String email, String subject, String message, String phoneNumber) {
        try {
            String formattedMessage = formatContactMessage(name, email, subject, message, phoneNumber);
            return sendMessage(senderNumber, formattedMessage);
        } catch (Exception e) {
            logger.error("Error sending WhatsApp contact form message: {}", e.getMessage(), e);
            return false;
        }
    }
    
    // Overloaded method for backward compatibility
    public boolean sendContactFormMessage(String name, String email, String subject, String message) {
        return sendContactFormMessage(name, email, subject, message, null);
    }
    
    public boolean sendMessage(String phoneNumber, String message) {
        try {
            String url = apiUrl + "/api/send-message";
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.set("Authorization", apiToken);
            
            // Create proper form data using MultiValueMap
            org.springframework.util.MultiValueMap<String, String> requestBody = new org.springframework.util.LinkedMultiValueMap<>();
            requestBody.add("phone", phoneNumber);
            requestBody.add("message", message);
            requestBody.add("isGroup", "false");
            
            HttpEntity<org.springframework.util.MultiValueMap<String, String>> request = new HttpEntity<>(requestBody, headers);
            
            logger.info("Sending WhatsApp message to: {} using Wablas API", phoneNumber);
            logger.debug("Request URL: {}", url);
            logger.debug("Request Body: {}", requestBody);
            
            ResponseEntity<Map> response = restTemplate.postForEntity(
                url, 
                request, 
                Map.class
            );
            
            if (response.getStatusCode() == HttpStatus.OK) {
                logger.info("WhatsApp message sent successfully to: {}", phoneNumber);
                logger.debug("Response: {}", response.getBody());
                return true;
            } else {
                logger.error("Failed to send WhatsApp message. Status: {}, Response: {}", 
                    response.getStatusCode(), response.getBody());
                return false;
            }
            
        } catch (Exception e) {
            logger.error("Error sending WhatsApp message to {}: {}", phoneNumber, e.getMessage(), e);
            return false;
        }
    }
    
    private String formatContactMessage(String name, String email, String subject, String message, String phoneNumber) {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        
        StringBuilder messageBuilder = new StringBuilder();
        messageBuilder.append("🔔 *New Contact Form Submission*\n\n");
        messageBuilder.append(String.format("👤 *Name:* %s\n", name));
        messageBuilder.append(String.format("📧 *Email:* %s\n", email));
        
        // Include phone number in message if provided
        if (phoneNumber != null && !phoneNumber.trim().isEmpty()) {
            messageBuilder.append(String.format("📱 *Phone:* %s\n", phoneNumber));
        }
        
        messageBuilder.append(String.format("📋 *Subject:* %s\n\n", subject));
        messageBuilder.append(String.format("💬 *Message:*\n%s\n\n", message));
        messageBuilder.append(String.format("⏰ *Sent at:* %s", now.format(formatter)));
        
        return messageBuilder.toString();
    }
    
    public boolean sendDirectChatMessage(String phoneNumber, String message) {
        return sendMessage(phoneNumber, message);
    }
}