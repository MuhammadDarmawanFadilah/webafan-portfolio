package com.webafan.portfolio.repository;

import com.webafan.portfolio.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    
    List<Education> findByProfileIdOrderByStartDateDesc(Long profileId);
    
    List<Education> findByIsCurrentTrue();
}