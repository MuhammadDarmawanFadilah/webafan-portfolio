package com.webafan.portfolio.repository;

import com.webafan.portfolio.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    
    Optional<Profile> findByEmail(String email);
    
    boolean existsByEmail(String email);
}