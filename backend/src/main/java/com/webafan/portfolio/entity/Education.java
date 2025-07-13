package com.webafan.portfolio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.math.BigDecimal;

@Entity
@Table(name = "educations")
@NoArgsConstructor
@AllArgsConstructor
public class Education {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Degree is required")
    @Column(nullable = false)
    private String degree;
    
    @NotBlank(message = "Field of study is required")
    @Column(name = "field_of_study", nullable = false)
    private String fieldOfStudy;
    
    @NotBlank(message = "Institution name is required")
    @Column(name = "institution_name", nullable = false)
    private String institutionName;
    
    @Column(name = "institution_location")
    private String institutionLocation;
    
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;
    
    @Column(name = "end_date")
    private LocalDate endDate;
    
    @Column(name = "is_current")
    private Boolean isCurrent = false;
    
    @Column(precision = 3, scale = 2)
    private BigDecimal gpa;
    
    @Column(name = "max_gpa", precision = 3, scale = 2)
    private BigDecimal maxGpa;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "display_order")
    private Integer displayOrder;
    
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
    
    public String getDegree() {
        return degree;
    }
    
    public void setDegree(String degree) {
        this.degree = degree;
    }
    
    public String getFieldOfStudy() {
        return fieldOfStudy;
    }
    
    public void setFieldOfStudy(String fieldOfStudy) {
        this.fieldOfStudy = fieldOfStudy;
    }
    
    public String getInstitutionName() {
        return institutionName;
    }
    
    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }
    
    public String getInstitutionLocation() {
        return institutionLocation;
    }
    
    public void setInstitutionLocation(String institutionLocation) {
        this.institutionLocation = institutionLocation;
    }
    
    public LocalDate getStartDate() {
        return startDate;
    }
    
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    
    public LocalDate getEndDate() {
        return endDate;
    }
    
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
    
    public Boolean getIsCurrent() {
        return isCurrent;
    }
    
    public void setIsCurrent(Boolean isCurrent) {
        this.isCurrent = isCurrent;
    }
    
    public BigDecimal getGpa() {
        return gpa;
    }
    
    public void setGpa(BigDecimal gpa) {
        this.gpa = gpa;
    }
    
    public BigDecimal getMaxGpa() {
        return maxGpa;
    }
    
    public void setMaxGpa(BigDecimal maxGpa) {
        this.maxGpa = maxGpa;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Integer getDisplayOrder() {
        return displayOrder;
    }
    
    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
    
    public Profile getProfile() {
        return profile;
    }
    
    public void setProfile(Profile profile) {
        this.profile = profile;
    }
}