package com.webafan.portfolio.controller;

import com.webafan.portfolio.entity.Profile;
import com.webafan.portfolio.service.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {
    
    private final ProfileService profileService;
    
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }
    
    @GetMapping
    public ResponseEntity<List<Profile>> getAllProfiles() {
        List<Profile> profiles = profileService.getAllProfiles();
        return ResponseEntity.ok(profiles);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfileById(@PathVariable Long id) {
        Optional<Profile> profile = profileService.getProfileById(id);
        return profile.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<Profile> getProfileByEmail(@PathVariable String email) {
        Optional<Profile> profile = profileService.getProfileByEmail(email);
        return profile.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Profile> createProfile(@Valid @RequestBody Profile profile) {
        if (profileService.existsByEmail(profile.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        Profile savedProfile = profileService.saveProfile(profile);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProfile);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Profile> updateProfile(@PathVariable Long id, @Valid @RequestBody Profile profileDetails) {
        try {
            Profile updatedProfile = profileService.updateProfile(id, profileDetails);
            return ResponseEntity.ok(updatedProfile);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        try {
            profileService.deleteProfile(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/check-email/{email}")
    public ResponseEntity<Boolean> checkEmailExists(@PathVariable String email) {
        boolean exists = profileService.existsByEmail(email);
        return ResponseEntity.ok(exists);
    }
    
    @GetMapping("/public")
    public ResponseEntity<Profile> getPublicProfile() {
        // Get the first profile as the main profile for public display
        List<Profile> profiles = profileService.getAllProfiles();
        if (!profiles.isEmpty()) {
            return ResponseEntity.ok(profiles.get(0));
        }
        return ResponseEntity.notFound().build();
    }
}