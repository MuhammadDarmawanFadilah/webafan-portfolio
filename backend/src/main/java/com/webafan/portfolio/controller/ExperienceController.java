package com.webafan.portfolio.controller;

import com.webafan.portfolio.entity.Experience;
import com.webafan.portfolio.service.ExperienceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/experiences")
@CrossOrigin(origins = "http://localhost:5173")
public class ExperienceController {
    
    private final ExperienceService experienceService;
    
    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }
    
    @GetMapping
    public ResponseEntity<List<Experience>> getAllExperiences() {
        List<Experience> experiences = experienceService.getAllExperiences();
        return ResponseEntity.ok(experiences);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Experience> getExperienceById(@PathVariable Long id) {
        Optional<Experience> experience = experienceService.getExperienceById(id);
        return experience.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/profile/{profileId}")
    public ResponseEntity<List<Experience>> getExperiencesByProfileId(@PathVariable Long profileId) {
        List<Experience> experiences = experienceService.getExperiencesByProfileId(profileId);
        return ResponseEntity.ok(experiences);
    }
    
    @GetMapping("/current")
    public ResponseEntity<List<Experience>> getCurrentExperiences() {
        List<Experience> experiences = experienceService.getCurrentExperiences();
        return ResponseEntity.ok(experiences);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Experience> createExperience(@Valid @RequestBody Experience experience) {
        Experience savedExperience = experienceService.saveExperience(experience);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExperience);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Experience> updateExperience(@PathVariable Long id, @Valid @RequestBody Experience experienceDetails) {
        try {
            Experience updatedExperience = experienceService.updateExperience(id, experienceDetails);
            return ResponseEntity.ok(updatedExperience);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        try {
            experienceService.deleteExperience(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}