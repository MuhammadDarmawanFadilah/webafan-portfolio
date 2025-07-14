package com.webafan.portfolio.repository;

import com.webafan.portfolio.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    
    // Find contacts by email
    List<Contact> findByEmailOrderByCreatedAtDesc(String email);
    
    // Find contacts created within a date range
    List<Contact> findByCreatedAtBetweenOrderByCreatedAtDesc(LocalDateTime startDate, LocalDateTime endDate);
    
    // Find contacts where WhatsApp was successfully sent
    List<Contact> findByWhatsappSentTrueOrderByCreatedAtDesc();
    
    // Find contacts where email was successfully sent
    List<Contact> findByEmailSentTrueOrderByCreatedAtDesc();
    
    // Find contacts where neither WhatsApp nor email was sent
    List<Contact> findByWhatsappSentFalseAndEmailSentFalseOrderByCreatedAtDesc();
    
    // Count total contacts
    @Query("SELECT COUNT(c) FROM Contact c")
    long countTotalContacts();
    
    // Count contacts by date range
    @Query("SELECT COUNT(c) FROM Contact c WHERE c.createdAt BETWEEN :startDate AND :endDate")
    long countContactsByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    
    // Find recent contacts (last N records)
    List<Contact> findTop10ByOrderByCreatedAtDesc();
}