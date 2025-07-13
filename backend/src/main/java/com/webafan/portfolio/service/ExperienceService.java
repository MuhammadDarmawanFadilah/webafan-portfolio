package com.webafan.portfolio.service;

import com.webafan.portfolio.entity.Experience;
import com.webafan.portfolio.entity.Profile;
import com.webafan.portfolio.repository.ExperienceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ExperienceService {
    
    private final ExperienceRepository experienceRepository;
    
    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }
    
    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }
    
    public Optional<Experience> getExperienceById(Long id) {
        return experienceRepository.findById(id);
    }
    
    public List<Experience> getExperiencesByProfile(Profile profile) {
        return experienceRepository.findByProfileOrderByDisplayOrderAsc(profile);
    }
    
    public List<Experience> getExperiencesByProfileId(Long profileId) {
        return experienceRepository.findByProfileIdOrderByStartDateDesc(profileId);
    }
    
    public List<Experience> getCurrentExperiences() {
        return experienceRepository.findByIsCurrentTrue();
    }
    
    public Experience saveExperience(Experience experience) {
        return experienceRepository.save(experience);
    }
    
    public Experience updateExperience(Long id, Experience experienceDetails) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Experience not found with id: " + id));
        
        experience.setJobTitle(experienceDetails.getJobTitle());
        experience.setCompanyName(experienceDetails.getCompanyName());
        experience.setCompanyLocation(experienceDetails.getCompanyLocation());
        experience.setStartDate(experienceDetails.getStartDate());
        experience.setEndDate(experienceDetails.getEndDate());
        experience.setIsCurrent(experienceDetails.getIsCurrent());
        experience.setDescription(experienceDetails.getDescription());
        experience.setTechnologiesUsed(experienceDetails.getTechnologiesUsed());
        experience.setKeyAchievements(experienceDetails.getKeyAchievements());
        experience.setDisplayOrder(experienceDetails.getDisplayOrder());
        
        return experienceRepository.save(experience);
    }
    
    public void deleteExperience(Long id) {
        experienceRepository.deleteById(id);
    }
}