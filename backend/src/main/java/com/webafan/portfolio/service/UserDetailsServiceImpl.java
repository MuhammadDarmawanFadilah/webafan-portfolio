package com.webafan.portfolio.service;

import com.webafan.portfolio.entity.User;
import com.webafan.portfolio.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {
    
    private final UserRepository userRepository;
    
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("🔍 UserDetailsService: Loading user for username: " + username);
        
        User user = userRepository.findByUsernameAndIsActiveTrue(username)
                .orElseThrow(() -> {
                    System.out.println("❌ UserDetailsService: User not found or inactive: " + username);
                    return new UsernameNotFoundException("User not found: " + username);
                });
        
        System.out.println("✅ UserDetailsService: User found - Username: " + user.getUsername() + ", Active: " + user.getIsActive());
        System.out.println("🔐 UserDetailsService: Stored password hash: " + user.getPassword().substring(0, 10) + "...");
        
        return user;
    }
}