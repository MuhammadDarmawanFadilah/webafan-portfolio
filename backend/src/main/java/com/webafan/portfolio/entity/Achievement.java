package com.webafan.portfolio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "achievements")
@NoArgsConstructor
@AllArgsConstructor
public class Achievement {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Achievement title is required")
    @Column(nullable = false)
    private String title;
    
    @Column(name = "issuing_organization")
    private String issuingOrganization;
    
    @Column(name = "issue_date")
    private LocalDate issueDate;
    
    @Column(name = "expiry_date")
    private LocalDate expiryDate;
    
    @Column(name = "credential_id")
    private String credentialId;
    
    @Column(name = "credential_url")
    private String credentialUrl;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "achievement_type")
    private AchievementType achievementType;
    
    @Column(name = "badge_image_url")
    private String badgeImageUrl;
    
    @Column(name = "display_order")
    private Integer displayOrder;
    
    @Column(name = "is_featured")
    private Boolean isFeatured = false;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private Profile profile;
    
    public enum AchievementType {
        CERTIFICATION,
        AWARD,
        COURSE_COMPLETION,
        LANGUAGE_PROFICIENCY,
        PRESENTATION,
        OTHER
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getIssuingOrganization() {
        return issuingOrganization;
    }
    
    public void setIssuingOrganization(String issuingOrganization) {
        this.issuingOrganization = issuingOrganization;
    }
    
    public LocalDate getIssueDate() {
        return issueDate;
    }
    
    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }
    
    public LocalDate getExpiryDate() {
        return expiryDate;
    }
    
    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }
    
    public String getCredentialId() {
        return credentialId;
    }
    
    public void setCredentialId(String credentialId) {
        this.credentialId = credentialId;
    }
    
    public String getCredentialUrl() {
        return credentialUrl;
    }
    
    public void setCredentialUrl(String credentialUrl) {
        this.credentialUrl = credentialUrl;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public AchievementType getAchievementType() {
        return achievementType;
    }
    
    public void setAchievementType(AchievementType achievementType) {
        this.achievementType = achievementType;
    }
    
    public String getBadgeImageUrl() {
        return badgeImageUrl;
    }
    
    public void setBadgeImageUrl(String badgeImageUrl) {
        this.badgeImageUrl = badgeImageUrl;
    }
    
    public Integer getDisplayOrder() {
        return displayOrder;
    }
    
    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
    
    public Boolean getIsFeatured() {
        return isFeatured;
    }
    
    public void setIsFeatured(Boolean isFeatured) {
        this.isFeatured = isFeatured;
    }
    
    public Profile getProfile() {
        return profile;
    }
    
    public void setProfile(Profile profile) {
        this.profile = profile;
    }
}