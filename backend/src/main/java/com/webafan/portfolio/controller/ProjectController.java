package com.webafan.portfolio.controller;

import com.webafan.portfolio.entity.Project;
import com.webafan.portfolio.entity.Project.ProjectStatus;
import com.webafan.portfolio.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")

public class ProjectController {
    
    private final ProjectService projectService;
    
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }
    
    // Public endpoints - No @PreAuthorize needed as they're handled by SecurityConfig
    @GetMapping("/public/all")
    public ResponseEntity<List<Project>> getAllProjectsPublic() {
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/public/current")
    public ResponseEntity<List<Project>> getCurrentProjectsPublic() {
        List<Project> projects = projectService.getCurrentProjects();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/public/finished")
    public ResponseEntity<List<Project>> getFinishedProjectsPublic() {
        List<Project> projects = projectService.getFinishedProjects();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/public/featured")
    public ResponseEntity<List<Project>> getFeaturedProjectsPublic() {
        List<Project> projects = projectService.getFeaturedProjects();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/public/{id}")
    public ResponseEntity<Project> getProjectByIdPublic(@PathVariable Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Admin endpoints (require authentication)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/current")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Project>> getCurrentProjects() {
        List<Project> projects = projectService.getCurrentProjects();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/finished")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Project>> getFinishedProjects() {
        List<Project> projects = projectService.getFinishedProjects();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> createProject(@Valid @RequestBody Project project) {
        try {
            Project createdProject = projectService.createProject(project);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @Valid @RequestBody Project projectDetails) {
        try {
            Project updatedProject = projectService.updateProject(id, projectDetails);
            return ResponseEntity.ok(updatedProject);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        try {
            projectService.deleteProject(id);
            return ResponseEntity.ok(Map.of("message", "Project deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> updateProjectStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        try {
            ProjectStatus status = ProjectStatus.valueOf(statusUpdate.get("status").toUpperCase());
            Project updatedProject = projectService.updateProjectStatus(id, status);
            return ResponseEntity.ok(updatedProject);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PatchMapping("/{id}/progress")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> updateProjectProgress(@PathVariable Long id, @RequestBody Map<String, Integer> progressUpdate) {
        try {
            Integer completionPercentage = progressUpdate.get("completionPercentage");
            Project updatedProject = projectService.updateProjectProgress(id, completionPercentage);
            return ResponseEntity.ok(updatedProject);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}