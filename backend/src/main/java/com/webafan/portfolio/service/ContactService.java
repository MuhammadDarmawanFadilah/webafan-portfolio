package com.webafan.portfolio.service;

import com.webafan.portfolio.entity.Contact;
import com.webafan.portfolio.repository.ContactRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ContactService {
    
    private static final Logger logger = LoggerFactory.getLogger(ContactService.class);
    
    private final ContactRepository contactRepository;
    private final WhatsAppService whatsAppService;
    
    public ContactService(ContactRepository contactRepository, WhatsAppService whatsAppService) {
        this.contactRepository = contactRepository;
        this.whatsAppService = whatsAppService;
    }
    
    public Contact submitContactForm(Contact contact) {
        try {
            // Save contact to database first
            Contact savedContact = contactRepository.save(contact);
            logger.info("Contact form saved to database with ID: {}", savedContact.getId());
            
            // Try to send WhatsApp message
            boolean whatsappSent = whatsAppService.sendContactFormMessage(
                contact.getName(),
                contact.getEmail(),
                contact.getSubject(),
                contact.getMessage(),
                contact.getPhoneNumber()
            );
            
            // Update contact with WhatsApp status
            savedContact.setWhatsappSent(whatsappSent);
            
            // For now, we'll set email as backup (can be implemented later)
            if (!whatsappSent) {
                logger.warn("WhatsApp message failed for contact ID: {}, email backup not implemented yet", savedContact.getId());
                savedContact.setEmailSent(false);
            }
            
            // Save updated status
            savedContact = contactRepository.save(savedContact);
            
            logger.info("Contact form processed successfully. ID: {}, WhatsApp sent: {}", 
                savedContact.getId(), whatsappSent);
            
            return savedContact;
            
        } catch (Exception e) {
            logger.error("Error processing contact form: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to process contact form: " + e.getMessage());
        }
    }
    
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }
    
    public List<Contact> getRecentContacts() {
        return contactRepository.findTop10ByOrderByCreatedAtDesc();
    }
    
    public Optional<Contact> getContactById(Long id) {
        return contactRepository.findById(id);
    }
    
    public List<Contact> getContactsByEmail(String email) {
        return contactRepository.findByEmailOrderByCreatedAtDesc(email);
    }
    
    public List<Contact> getContactsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return contactRepository.findByCreatedAtBetweenOrderByCreatedAtDesc(startDate, endDate);
    }
    
    public long getTotalContactsCount() {
        return contactRepository.countTotalContacts();
    }
    
    public long getContactsCountByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return contactRepository.countContactsByDateRange(startDate, endDate);
    }
    
    public List<Contact> getSuccessfulWhatsAppContacts() {
        return contactRepository.findByWhatsappSentTrueOrderByCreatedAtDesc();
    }
    
    public List<Contact> getFailedContacts() {
        return contactRepository.findByWhatsappSentFalseAndEmailSentFalseOrderByCreatedAtDesc();
    }
    
    public boolean resendWhatsAppMessage(Long contactId) {
        try {
            Optional<Contact> contactOpt = contactRepository.findById(contactId);
            if (contactOpt.isEmpty()) {
                logger.error("Contact not found with ID: {}", contactId);
                return false;
            }
            
            Contact contact = contactOpt.get();
            boolean sent = whatsAppService.sendContactFormMessage(
                contact.getName(),
                contact.getEmail(),
                contact.getSubject(),
                contact.getMessage(),
                contact.getPhoneNumber()
            );
            
            if (sent) {
                contact.setWhatsappSent(true);
                contactRepository.save(contact);
                logger.info("WhatsApp message resent successfully for contact ID: {}", contactId);
            }
            
            return sent;
            
        } catch (Exception e) {
            logger.error("Error resending WhatsApp message for contact ID {}: {}", contactId, e.getMessage(), e);
            return false;
        }
    }
    
    public void deleteContact(Long id) {
        try {
            if (contactRepository.existsById(id)) {
                contactRepository.deleteById(id);
                logger.info("Contact deleted successfully with ID: {}", id);
            } else {
                logger.warn("Attempted to delete non-existent contact with ID: {}", id);
                throw new RuntimeException("Contact not found with ID: " + id);
            }
        } catch (Exception e) {
            logger.error("Error deleting contact with ID {}: {}", id, e.getMessage(), e);
            throw new RuntimeException("Failed to delete contact: " + e.getMessage());
        }
    }
}