package com.webafan.portfolio.repository;

import com.webafan.portfolio.entity.Education;
import com.webafan.portfolio.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    
    List<Education> findByProfileOrderByDisplayOrderAsc(Profile profile);
    
    List<Education> findByProfileIdOrderByStartDateDesc(Long profileId);
    
    List<Education> findByIsCurrentTrue();
}