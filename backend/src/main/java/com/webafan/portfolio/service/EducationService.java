package com.webafan.portfolio.service;

import com.webafan.portfolio.entity.Education;
import com.webafan.portfolio.entity.Profile;
import com.webafan.portfolio.repository.EducationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EducationService {
    
    private final EducationRepository educationRepository;
    
    public EducationService(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }
    
    public List<Education> getAllEducations() {
        return educationRepository.findAll();
    }
    
    public Optional<Education> getEducationById(Long id) {
        return educationRepository.findById(id);
    }
    
    public Education createEducation(Education education) {
        return educationRepository.save(education);
    }
    
    public Education updateEducation(Long id, Education educationDetails) {
        Education education = educationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Education not found with id: " + id));
        
        education.setDegree(educationDetails.getDegree());
        education.setFieldOfStudy(educationDetails.getFieldOfStudy());
        education.setInstitutionName(educationDetails.getInstitutionName());
        education.setInstitutionLocation(educationDetails.getInstitutionLocation());
        education.setStartDate(educationDetails.getStartDate());
        education.setEndDate(educationDetails.getEndDate());
        education.setIsCurrent(educationDetails.getIsCurrent());
        education.setGpa(educationDetails.getGpa());
        education.setMaxGpa(educationDetails.getMaxGpa());
        education.setDescription(educationDetails.getDescription());
        education.setDisplayOrder(educationDetails.getDisplayOrder());
        education.setProfile(educationDetails.getProfile());
        
        return educationRepository.save(education);
    }
    
    public void deleteEducation(Long id) {
        Education education = educationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Education not found with id: " + id));
        
        educationRepository.delete(education);
    }
    
    public List<Education> getEducationsByProfile(Profile profile) {
        return educationRepository.findByProfileOrderByDisplayOrderAsc(profile);
    }
    
    public List<Education> getEducationsByProfileId(Long profileId) {
        return educationRepository.findByProfileIdOrderByStartDateDesc(profileId);
    }
    
    public List<Education> getCurrentEducations() {
        return educationRepository.findByIsCurrentTrue();
    }
}