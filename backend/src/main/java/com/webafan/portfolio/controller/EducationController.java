package com.webafan.portfolio.controller;

import com.webafan.portfolio.entity.Education;
import com.webafan.portfolio.service.EducationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/educations")

public class EducationController {
    
    private final EducationService educationService;
    
    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }
    
    // Public endpoints
    @GetMapping
    public ResponseEntity<List<Education>> getAllEducations() {
        List<Education> educations = educationService.getAllEducations();
        return ResponseEntity.ok(educations);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Education> getEducationById(@PathVariable Long id) {
        Optional<Education> education = educationService.getEducationById(id);
        return education.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Admin endpoints
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Education> createEducation(@Valid @RequestBody Education education) {
        try {
            Education createdEducation = educationService.createEducation(education);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEducation);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Education> updateEducation(@PathVariable Long id, @Valid @RequestBody Education educationDetails) {
        try {
            Education updatedEducation = educationService.updateEducation(id, educationDetails);
            return ResponseEntity.ok(updatedEducation);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteEducation(@PathVariable Long id) {
        try {
            educationService.deleteEducation(id);
            return ResponseEntity.ok(Map.of("message", "Education deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}