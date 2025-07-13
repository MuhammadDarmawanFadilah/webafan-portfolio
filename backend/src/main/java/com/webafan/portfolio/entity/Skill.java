package com.webafan.portfolio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "skills")
@NoArgsConstructor
@AllArgsConstructor
public class Skill {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Skill name is required")
    @Column(name = "skill_name", nullable = false)
    private String skillName;
    
    @Column(name = "skill_category")
    private String skillCategory;
    
    @Min(value = 0, message = "Proficiency level must be between 0 and 100")
    @Max(value = 100, message = "Proficiency level must be between 0 and 100")
    @Column(name = "proficiency_level", nullable = false)
    private Integer proficiencyLevel;
    
    @Column(name = "years_experience")
    private Integer yearsExperience;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "icon_url")
    private String iconUrl;
    
    @Column(name = "display_order")
    private Integer displayOrder;
    
    @Column(name = "is_featured")
    private Boolean isFeatured = false;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private Profile profile;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getSkillName() {
        return skillName;
    }
    
    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }
    
    public String getSkillCategory() {
        return skillCategory;
    }
    
    public void setSkillCategory(String skillCategory) {
        this.skillCategory = skillCategory;
    }
    
    public Integer getProficiencyLevel() {
        return proficiencyLevel;
    }
    
    public void setProficiencyLevel(Integer proficiencyLevel) {
        this.proficiencyLevel = proficiencyLevel;
    }
    
    public Integer getYearsExperience() {
        return yearsExperience;
    }
    
    public void setYearsExperience(Integer yearsExperience) {
        this.yearsExperience = yearsExperience;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getIconUrl() {
        return iconUrl;
    }
    
    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
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