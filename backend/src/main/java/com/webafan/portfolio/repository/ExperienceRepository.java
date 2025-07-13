package com.webafan.portfolio.repository;

import com.webafan.portfolio.entity.Experience;
import com.webafan.portfolio.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    
    List<Experience> findByProfileOrderByDisplayOrderAsc(Profile profile);
    
    List<Experience> findByProfileIdOrderByStartDateDesc(Long profileId);
    
    List<Experience> findByIsCurrentTrue();
}