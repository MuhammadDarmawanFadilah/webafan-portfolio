package com.webafan.portfolio.repository;

import com.webafan.portfolio.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    
    List<Skill> findByProfileIdOrderByProficiencyLevelDesc(Long profileId);
    
    List<Skill> findBySkillCategory(String skillCategory);
    
    List<Skill> findByIsFeaturedTrue();
    
    @Query("SELECT DISTINCT s.skillCategory FROM Skill s WHERE s.skillCategory IS NOT NULL ORDER BY s.skillCategory")
    List<String> findDistinctSkillCategories();
}