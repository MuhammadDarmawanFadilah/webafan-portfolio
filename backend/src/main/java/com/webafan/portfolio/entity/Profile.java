package com.webafan.portfolio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "profiles")
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String fullName;
    
    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;
    
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Column(nullable = false, unique = true)
    private String email;
    
    @NotBlank(message = "Phone is required")
    @Column(nullable = false)
    private String phone;
    
    @Column(name = "birth_date")
    private LocalDate birthDate;
    
    @Column(name = "birth_place")
    private String birthPlace;
    
    @Column(name = "address", columnDefinition = "TEXT")
    private String address;
    
    @Column(name = "current_address", columnDefinition = "TEXT")
    private String currentAddress;
    
    @Column(name = "about", columnDefinition = "TEXT")
    private String about;
    
    @Column(name = "profile_image_url")
    private String profileImageUrl;
    
    @Column(name = "years_experience")
    private Integer yearsExperience;
    
    @Column(name = "linkedin_url")
    private String linkedinUrl;
    
    @Column(name = "github_url")
    private String githubUrl;
    
    @Column(name = "website_url")
    private String websiteUrl;
    
    @Column(name = "roles")
    private String roles;
    
    @Column(name = "projects_count")
    private Integer projectsCount;
    
    @Column(name = "degrees_count")
    private Integer degreesCount;
    
    @Column(name = "certificates_count")
    private Integer certificatesCount;
    
    @Column(name = "top_skills")
    private String topSkills;
    
    @Column(name = "personal_story", columnDefinition = "TEXT")
    private String personalStory;
    
    @Column(name = "values", columnDefinition = "TEXT")
    private String values;
    
    @Column(name = "expertise_areas", columnDefinition = "TEXT")
    private String expertiseAreas;
    
    @Column(name = "technical_skills", columnDefinition = "TEXT")
    private String technicalSkills;
    
    @Column(name = "cv_file_url")
    private String cvFileUrl;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public LocalDate getBirthDate() {
        return birthDate;
    }
    
    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }
    
    public String getBirthPlace() {
        return birthPlace;
    }
    
    public void setBirthPlace(String birthPlace) {
        this.birthPlace = birthPlace;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getCurrentAddress() {
        return currentAddress;
    }
    
    public void setCurrentAddress(String currentAddress) {
        this.currentAddress = currentAddress;
    }
    
    public String getAbout() {
        return about;
    }
    
    public void setAbout(String about) {
        this.about = about;
    }
    
    public String getProfileImageUrl() {
        return profileImageUrl;
    }
    
    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }
    
    public Integer getYearsExperience() {
        return yearsExperience;
    }
    
    public void setYearsExperience(Integer yearsExperience) {
        this.yearsExperience = yearsExperience;
    }
    
    public String getLinkedinUrl() {
        return linkedinUrl;
    }
    
    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }
    
    public String getGithubUrl() {
        return githubUrl;
    }
    
    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }
    
    public String getWebsiteUrl() {
        return websiteUrl;
    }
    
    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }
    
    public String getRoles() {
        return roles;
    }
    
    public void setRoles(String roles) {
        this.roles = roles;
    }
    
    public Integer getProjectsCount() {
        return projectsCount;
    }
    
    public void setProjectsCount(Integer projectsCount) {
        this.projectsCount = projectsCount;
    }
    
    public Integer getDegreesCount() {
        return degreesCount;
    }
    
    public void setDegreesCount(Integer degreesCount) {
        this.degreesCount = degreesCount;
    }
    
    public Integer getCertificatesCount() {
        return certificatesCount;
    }
    
    public void setCertificatesCount(Integer certificatesCount) {
        this.certificatesCount = certificatesCount;
    }
    
    public String getTopSkills() {
        return topSkills;
    }
    
    public void setTopSkills(String topSkills) {
        this.topSkills = topSkills;
    }
    
    public String getPersonalStory() {
        return personalStory;
    }
    
    public void setPersonalStory(String personalStory) {
        this.personalStory = personalStory;
    }
    
    public String getValues() {
        return values;
    }
    
    public void setValues(String values) {
        this.values = values;
    }
    
    public String getExpertiseAreas() {
        return expertiseAreas;
    }
    
    public void setExpertiseAreas(String expertiseAreas) {
        this.expertiseAreas = expertiseAreas;
    }
    
    public String getTechnicalSkills() {
        return technicalSkills;
    }
    
    public void setTechnicalSkills(String technicalSkills) {
        this.technicalSkills = technicalSkills;
    }
    
    public String getCvFileUrl() {
        return cvFileUrl;
    }
    
    public void setCvFileUrl(String cvFileUrl) {
        this.cvFileUrl = cvFileUrl;
    }
}