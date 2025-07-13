package com.webafan.portfolio.repository;

import com.webafan.portfolio.entity.Project;
import com.webafan.portfolio.entity.Project.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    List<Project> findByStatusOrderByDisplayOrderAsc(ProjectStatus status);
    
    List<Project> findByStatusOrderByCreatedAtDesc(ProjectStatus status);
    
    List<Project> findByIsFeaturedTrueOrderByDisplayOrderAsc();
    
    @Query("SELECT p FROM Project p WHERE p.status = :status ORDER BY p.displayOrder ASC, p.createdAt DESC")
    List<Project> findByStatusOrderByDisplayOrderAndCreatedAt(ProjectStatus status);
    
    @Query("SELECT p FROM Project p ORDER BY p.displayOrder ASC, p.createdAt DESC")
    List<Project> findAllOrderByDisplayOrderAndCreatedAt();
    
    List<Project> findByProfileIdOrderByDisplayOrderAsc(Long profileId);
}