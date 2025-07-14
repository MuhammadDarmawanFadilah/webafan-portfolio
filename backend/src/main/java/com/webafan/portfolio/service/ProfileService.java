package com.webafan.portfolio.service;

import com.webafan.portfolio.entity.Profile;
import com.webafan.portfolio.repository.ProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProfileService {
    
    private final ProfileRepository profileRepository;
    
    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }
    
    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }
    
    public Optional<Profile> getProfileById(Long id) {
        return profileRepository.findById(id);
    }
    
    public Optional<Profile> getProfileByEmail(String email) {
        return profileRepository.findByEmail(email);
    }
    
    public Profile saveProfile(Profile profile) {
        return profileRepository.save(profile);
    }
    
    public Profile updateProfile(Long id, Profile profileDetails) {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found with id: " + id));
        
        profile.setFullName(profileDetails.getFullName());
        profile.setTitle(profileDetails.getTitle());
        profile.setEmail(profileDetails.getEmail());
        profile.setPhone(profileDetails.getPhone());
        profile.setBirthDate(profileDetails.getBirthDate());
        profile.setBirthPlace(profileDetails.getBirthPlace());
        profile.setAddress(profileDetails.getAddress());
        profile.setCurrentAddress(profileDetails.getCurrentAddress());
        profile.setAbout(profileDetails.getAbout());
        profile.setProfileImageUrl(profileDetails.getProfileImageUrl());
        profile.setYearsExperience(profileDetails.getYearsExperience());
        profile.setLinkedinUrl(profileDetails.getLinkedinUrl());
        profile.setGithubUrl(profileDetails.getGithubUrl());
        profile.setWebsiteUrl(profileDetails.getWebsiteUrl());
        profile.setRoles(profileDetails.getRoles());
        profile.setProjectsCount(profileDetails.getProjectsCount());
        profile.setDegreesCount(profileDetails.getDegreesCount());
        profile.setCertificatesCount(profileDetails.getCertificatesCount());
        profile.setTopSkills(profileDetails.getTopSkills());
        profile.setPersonalStory(profileDetails.getPersonalStory());
        profile.setValues(profileDetails.getValues());
        profile.setExpertiseAreas(profileDetails.getExpertiseAreas());
        profile.setTechnicalSkills(profileDetails.getTechnicalSkills());
        profile.setCvFileUrl(profileDetails.getCvFileUrl());
        
        return profileRepository.save(profile);
    }
    
    public void deleteProfile(Long id) {
        profileRepository.deleteById(id);
    }
    
    public boolean existsByEmail(String email) {
        return profileRepository.existsByEmail(email);
    }
}