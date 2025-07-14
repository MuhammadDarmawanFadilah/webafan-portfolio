package com.webafan.portfolio.service;

import com.webafan.portfolio.entity.Project;
import com.webafan.portfolio.entity.Project.ProjectStatus;
import com.webafan.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProjectService {
    
    private final ProjectRepository projectRepository;
    
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }
    
    public List<Project> getAllProjects() {
        return projectRepository.findAllOrderByDisplayOrderAndCreatedAt();
    }
    
    public List<Project> getCurrentProjects() {
        return projectRepository.findByStatusOrderByDisplayOrderAndCreatedAt(ProjectStatus.CURRENT);
    }
    
    public List<Project> getFinishedProjects() {
        try {
            return projectRepository.findByStatusOrderByDisplayOrderAndCreatedAt(ProjectStatus.FINISHED);
        } catch (Exception e) {
            System.err.println("Error in getFinishedProjects: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to retrieve finished projects: " + e.getMessage(), e);
        }
    }
    
    public List<Project> getFeaturedProjects() {
        return projectRepository.findByIsFeaturedTrueOrderByDisplayOrderAsc();
    }
    
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }
    
    public Project createProject(Project project) {
        // Set default values if not provided
        if (project.getStatus() == null) {
            project.setStatus(ProjectStatus.CURRENT);
        }
        if (project.getCompletionPercentage() == null) {
            project.setCompletionPercentage(0);
        }
        if (project.getIsFeatured() == null) {
            project.setIsFeatured(false);
        }
        if (project.getDisplayOrder() == null) {
            project.setDisplayOrder(0);
        }
        
        return projectRepository.save(project);
    }
    
    public Project updateProject(Long id, Project projectDetails) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        
        // Update fields
        project.setTitle(projectDetails.getTitle());
        project.setDescription(projectDetails.getDescription());
        project.setShortDescription(projectDetails.getShortDescription());
        project.setStartDate(projectDetails.getStartDate());
        project.setEndDate(projectDetails.getEndDate());
        project.setStatus(projectDetails.getStatus());
        project.setProjectUrl(projectDetails.getProjectUrl());
        project.setGithubUrl(projectDetails.getGithubUrl());
        project.setDemoUrl(projectDetails.getDemoUrl());
        project.setImageUrl(projectDetails.getImageUrl());
        project.setTechnologies(projectDetails.getTechnologies());
        project.setFeatures(projectDetails.getFeatures());
        project.setClientName(projectDetails.getClientName());
        project.setTeamSize(projectDetails.getTeamSize());
        project.setMyRole(projectDetails.getMyRole());
        project.setCompletionPercentage(projectDetails.getCompletionPercentage());
        project.setIsFeatured(projectDetails.getIsFeatured());
        project.setDisplayOrder(projectDetails.getDisplayOrder());
        project.setProfile(projectDetails.getProfile());
        
        return projectRepository.save(project);
    }
    
    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        
        projectRepository.delete(project);
    }
    
    public Project updateProjectStatus(Long id, ProjectStatus status) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        
        project.setStatus(status);
        
        // If marking as finished, set completion to 100%
        if (status == ProjectStatus.FINISHED) {
            project.setCompletionPercentage(100);
        }
        
        return projectRepository.save(project);
    }
    
    public Project updateProjectProgress(Long id, Integer completionPercentage) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        
        project.setCompletionPercentage(completionPercentage);
        
        // Auto-update status based on completion
        if (completionPercentage >= 100) {
            project.setStatus(ProjectStatus.FINISHED);
        } else if (project.getStatus() == ProjectStatus.FINISHED) {
            project.setStatus(ProjectStatus.CURRENT);
        }
        
        return projectRepository.save(project);
    }
    
    public List<Project> getProjectsByProfileId(Long profileId) {
        return projectRepository.findByProfileIdOrderByDisplayOrderAsc(profileId);
    }
}