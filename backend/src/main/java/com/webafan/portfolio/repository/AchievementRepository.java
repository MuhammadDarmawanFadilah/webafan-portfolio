package com.webafan.portfolio.repository;

import com.webafan.portfolio.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    
    List<Achievement> findByProfileIdOrderByIssueDateDesc(Long profileId);
    
    List<Achievement> findByAchievementType(Achievement.AchievementType achievementType);
    
    List<Achievement> findByIsFeaturedTrue();
}