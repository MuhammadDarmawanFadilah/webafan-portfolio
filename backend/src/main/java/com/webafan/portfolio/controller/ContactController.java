package com.webafan.portfolio.controller;

import com.webafan.portfolio.entity.Contact;
import com.webafan.portfolio.service.ContactService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/contacts")

public class ContactController {
    
    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);
    
    private final ContactService contactService;
    
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }
    
    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitContactForm(@Valid @RequestBody Contact contact) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            logger.info("Received contact form submission from: {} ({})", contact.getName(), contact.getEmail());
            
            Contact savedContact = contactService.submitContactForm(contact);
            
            response.put("success", true);
            response.put("message", "Your message has been sent successfully! I'll get back to you within 24 hours.");
            response.put("contactId", savedContact.getId());
            response.put("whatsappSent", savedContact.getWhatsappSent());
            response.put("emailSent", savedContact.getEmailSent());
            response.put("timestamp", savedContact.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            
            if (savedContact.getWhatsappSent()) {
                response.put("primaryMethod", "WhatsApp");
                response.put("responseTime", "I typically respond via WhatsApp within 2-4 hours during business hours.");
            } else {
                response.put("primaryMethod", "Email");
                response.put("responseTime", "I'll respond via email within 24 hours.");
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error processing contact form submission: {}", e.getMessage(), e);
            
            response.put("success", false);
            response.put("message", "Sorry, there was an error sending your message. Please try again or contact me directly.");
            response.put("error", e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Contact>> getAllContacts() {
        try {
            List<Contact> contacts = contactService.getAllContacts();
            return ResponseEntity.ok(contacts);
        } catch (Exception e) {
            logger.error("Error fetching all contacts: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/admin/recent")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Contact>> getRecentContacts() {
        try {
            List<Contact> contacts = contactService.getRecentContacts();
            return ResponseEntity.ok(contacts);
        } catch (Exception e) {
            logger.error("Error fetching recent contacts: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        try {
            Optional<Contact> contact = contactService.getContactById(id);
            return contact.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Error fetching contact by ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/admin/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getContactStats() {
        try {
            Map<String, Object> stats = new HashMap<>();
            
            long totalContacts = contactService.getTotalContactsCount();
            List<Contact> recentContacts = contactService.getRecentContacts();
            List<Contact> successfulWhatsApp = contactService.getSuccessfulWhatsAppContacts();
            List<Contact> failedContacts = contactService.getFailedContacts();
            
            // Calculate today's contacts
            LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
            LocalDateTime endOfDay = startOfDay.plusDays(1).minusNanos(1);
            long todayContacts = contactService.getContactsCountByDateRange(startOfDay, endOfDay);
            
            // Calculate this week's contacts
            LocalDateTime startOfWeek = LocalDateTime.now().minusDays(7);
            long weekContacts = contactService.getContactsCountByDateRange(startOfWeek, LocalDateTime.now());
            
            stats.put("totalContacts", totalContacts);
            stats.put("todayContacts", todayContacts);
            stats.put("weekContacts", weekContacts);
            stats.put("successfulWhatsApp", successfulWhatsApp.size());
            stats.put("failedContacts", failedContacts.size());
            stats.put("recentContactsCount", recentContacts.size());
            
            if (totalContacts > 0) {
                double whatsappSuccessRate = (double) successfulWhatsApp.size() / totalContacts * 100;
                stats.put("whatsappSuccessRate", Math.round(whatsappSuccessRate * 100.0) / 100.0);
            } else {
                stats.put("whatsappSuccessRate", 0.0);
            }
            
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            logger.error("Error fetching contact stats: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PostMapping("/admin/{id}/resend-whatsapp")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> resendWhatsAppMessage(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            boolean sent = contactService.resendWhatsAppMessage(id);
            
            response.put("success", sent);
            if (sent) {
                response.put("message", "WhatsApp message resent successfully");
            } else {
                response.put("message", "Failed to resend WhatsApp message");
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error resending WhatsApp message for contact ID {}: {}", id, e.getMessage(), e);
            
            response.put("success", false);
            response.put("message", "Error resending WhatsApp message: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deleteContact(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();
        
        try {
            contactService.deleteContact(id);
            
            response.put("success", "true");
            response.put("message", "Contact deleted successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error deleting contact with ID {}: {}", id, e.getMessage(), e);
            
            response.put("success", "false");
            response.put("message", "Error deleting contact: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}