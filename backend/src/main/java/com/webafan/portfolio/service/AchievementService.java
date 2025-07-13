package com.webafan.portfolio.service;

import com.webafan.portfolio.entity.Achievement;
import com.webafan.portfolio.entity.Profile;
import com.webafan.portfolio.repository.AchievementRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AchievementService {
    
    private final AchievementRepository achievementRepository;
    
    public AchievementService(AchievementRepository achievementRepository) {
        this.achievementRepository = achievementRepository;
    }
    
    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAll();
    }
    
    public Optional<Achievement> getAchievementById(Long id) {
        return achievementRepository.findById(id);
    }
    
    public Achievement createAchievement(Achievement achievement) {
        return achievementRepository.save(achievement);
    }
    
    public Achievement updateAchievement(Long id, Achievement achievementDetails) {
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Achievement not found with id: " + id));
        
        achievement.setTitle(achievementDetails.getTitle());
        achievement.setDescription(achievementDetails.getDescription());
        achievement.setIssuingOrganization(achievementDetails.getIssuingOrganization());
        achievement.setIssueDate(achievementDetails.getIssueDate());
        achievement.setExpiryDate(achievementDetails.getExpiryDate());
        achievement.setCredentialId(achievementDetails.getCredentialId());
        achievement.setCredentialUrl(achievementDetails.getCredentialUrl());
        achievement.setAchievementType(achievementDetails.getAchievementType());
        achievement.setBadgeImageUrl(achievementDetails.getBadgeImageUrl());
        achievement.setIsFeatured(achievementDetails.getIsFeatured());
        achievement.setDisplayOrder(achievementDetails.getDisplayOrder());
        achievement.setProfile(achievementDetails.getProfile());
        
        return achievementRepository.save(achievement);
    }
    
    public void deleteAchievement(Long id) {
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Achievement not found with id: " + id));
        
        achievementRepository.delete(achievement);
    }
    
    public List<Achievement> getAchievementsByProfile(Profile profile) {
        return achievementRepository.findByProfileOrderByDisplayOrderAsc(profile);
    }
    
    public List<Achievement> getAchievementsByProfileId(Long profileId) {
        return achievementRepository.findByProfileIdOrderByIssueDateDesc(profileId);
    }
    
    public List<Achievement> getAchievementsByType(Achievement.AchievementType type) {
        return achievementRepository.findByAchievementType(type);
    }
    
    public List<Achievement> getFeaturedAchievements() {
        return achievementRepository.findByIsFeaturedTrue();
    }
}