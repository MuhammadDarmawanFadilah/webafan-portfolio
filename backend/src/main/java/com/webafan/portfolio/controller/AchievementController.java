package com.webafan.portfolio.controller;

import com.webafan.portfolio.entity.Achievement;
import com.webafan.portfolio.service.AchievementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "http://localhost:5174")
public class AchievementController {
    
    private final AchievementService achievementService;
    
    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }
    
    // Public endpoints
    @GetMapping
    public ResponseEntity<List<Achievement>> getAllAchievements() {
        List<Achievement> achievements = achievementService.getAllAchievements();
        return ResponseEntity.ok(achievements);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Achievement> getAchievementById(@PathVariable Long id) {
        Optional<Achievement> achievement = achievementService.getAchievementById(id);
        return achievement.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Admin endpoints
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Achievement> createAchievement(@Valid @RequestBody Achievement achievement) {
        try {
            Achievement createdAchievement = achievementService.createAchievement(achievement);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAchievement);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Achievement> updateAchievement(@PathVariable Long id, @Valid @RequestBody Achievement achievementDetails) {
        try {
            Achievement updatedAchievement = achievementService.updateAchievement(id, achievementDetails);
            return ResponseEntity.ok(updatedAchievement);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteAchievement(@PathVariable Long id) {
        try {
            achievementService.deleteAchievement(id);
            return ResponseEntity.ok(Map.of("message", "Achievement deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}