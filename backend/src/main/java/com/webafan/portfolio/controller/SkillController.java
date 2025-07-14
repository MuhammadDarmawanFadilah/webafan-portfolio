package com.webafan.portfolio.controller;

import com.webafan.portfolio.entity.Skill;
import com.webafan.portfolio.service.SkillService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/skills")

public class SkillController {
    
    private final SkillService skillService;
    
    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }
    
    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        List<Skill> skills = skillService.getAllSkills();
        return ResponseEntity.ok(skills);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable Long id) {
        Optional<Skill> skill = skillService.getSkillById(id);
        return skill.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/profile/{profileId}")
    public ResponseEntity<List<Skill>> getSkillsByProfileId(@PathVariable Long profileId) {
        List<Skill> skills = skillService.getSkillsByProfileId(profileId);
        return ResponseEntity.ok(skills);
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Skill>> getSkillsByCategory(@PathVariable String category) {
        List<Skill> skills = skillService.getSkillsByCategory(category);
        return ResponseEntity.ok(skills);
    }
    
    @GetMapping("/featured")
    public ResponseEntity<List<Skill>> getFeaturedSkills() {
        List<Skill> skills = skillService.getFeaturedSkills();
        return ResponseEntity.ok(skills);
    }
    
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getSkillCategories() {
        List<String> categories = skillService.getSkillCategories();
        return ResponseEntity.ok(categories);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Skill> createSkill(@Valid @RequestBody Skill skill) {
        Skill savedSkill = skillService.saveSkill(skill);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSkill);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long id, @Valid @RequestBody Skill skillDetails) {
        try {
            Skill updatedSkill = skillService.updateSkill(id, skillDetails);
            return ResponseEntity.ok(updatedSkill);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        try {
            skillService.deleteSkill(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}