package com.webafan.portfolio.service;

import com.webafan.portfolio.entity.Skill;
import com.webafan.portfolio.entity.Profile;
import com.webafan.portfolio.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SkillService {
    
    private final SkillRepository skillRepository;
    
    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }
    
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }
    
    public Optional<Skill> getSkillById(Long id) {
        return skillRepository.findById(id);
    }
    
    public List<Skill> getSkillsByProfile(Profile profile) {
        return skillRepository.findByProfileOrderByDisplayOrderAsc(profile);
    }
    
    public List<Skill> getSkillsByProfileId(Long profileId) {
        return skillRepository.findByProfileIdOrderByProficiencyLevelDesc(profileId);
    }
    
    public List<Skill> getSkillsByCategory(String category) {
        return skillRepository.findBySkillCategory(category);
    }
    
    public List<Skill> getFeaturedSkills() {
        return skillRepository.findByIsFeaturedTrue();
    }
    
    public List<String> getSkillCategories() {
        return skillRepository.findDistinctSkillCategories();
    }
    
    public Skill saveSkill(Skill skill) {
        return skillRepository.save(skill);
    }
    
    public Skill updateSkill(Long id, Skill skillDetails) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found with id: " + id));
        
        skill.setSkillName(skillDetails.getSkillName());
        skill.setSkillCategory(skillDetails.getSkillCategory());
        skill.setProficiencyLevel(skillDetails.getProficiencyLevel());
        skill.setYearsExperience(skillDetails.getYearsExperience());
        skill.setDescription(skillDetails.getDescription());
        skill.setIconUrl(skillDetails.getIconUrl());
        skill.setDisplayOrder(skillDetails.getDisplayOrder());
        skill.setIsFeatured(skillDetails.getIsFeatured());
        
        return skillRepository.save(skill);
    }
    
    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }
}