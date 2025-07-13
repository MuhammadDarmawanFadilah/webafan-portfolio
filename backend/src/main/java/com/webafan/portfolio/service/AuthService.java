package com.webafan.portfolio.service;

import com.webafan.portfolio.entity.User;
import com.webafan.portfolio.repository.UserRepository;
import com.webafan.portfolio.util.JwtUtil;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class AuthService {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    public AuthService(UserRepository userRepository,
                      PasswordEncoder passwordEncoder,
                      JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }
    
    public Map<String, Object> login(String username, String password) {
        try {
            logger.info("🔐 AuthService: Login attempt for username: {}", username);
            logger.info("🔐 AuthService: Password length: {}", (password != null ? password.length() : "null"));
            
            // Check if user exists and is active
            Optional<User> userOpt = userRepository.findByUsernameAndIsActiveTrue(username);
            
            if (userOpt.isEmpty()) {
                logger.error("❌ AuthService: User not found or inactive: {}", username);
                throw new BadCredentialsException("Invalid username or password");
            }
            
            User user = userOpt.get();
            logger.info("✅ AuthService: User found - ID: {}, Username: {}, Active: {}", user.getId(), user.getUsername(), user.getIsActive());
            logger.info("🔐 AuthService: Stored password hash: {}...", user.getPassword().substring(0, Math.min(20, user.getPassword().length())));
            
            // Verify password directly using password encoder
            boolean passwordMatches = passwordEncoder.matches(password, user.getPassword());
            logger.info("🔐 AuthService: Password matches: {}", passwordMatches);
            
            if (!passwordMatches) {
                logger.error("❌ AuthService: Password verification failed for: {}", username);
                throw new BadCredentialsException("Invalid username or password");
            }
            
            logger.info("✅ AuthService: Password verification successful for: {}", username);
            
            // Update last login
            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);
            
            // Generate simple token for now
            String token = "jwt-token-" + username + "-" + System.currentTimeMillis();
            
            // Prepare response
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "fullName", user.getFullName() != null ? user.getFullName() : user.getUsername(),
                "role", user.getRole().name(),
                "lastLogin", user.getLastLogin()
            ));
            response.put("message", "Login successful");
            
            logger.info("✅ AuthService: Login successful, returning token");
            return response;
            
        } catch (Exception e) {
            logger.error("❌ AuthService: Authentication failed for username: {}", username);
            logger.error("❌ AuthService: Exception class: {}", e.getClass().getSimpleName());
            logger.error("❌ AuthService: Exception message: {}", e.getMessage());
            logger.error("❌ AuthService: Full stack trace:", e);
            throw new BadCredentialsException("Invalid username or password");
        }
    }
    
    public User createUser(String username, String password, String fullName, User.Role role) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
        
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setFullName(fullName);
        user.setRole(role);
        user.setIsActive(true);
        
        return userRepository.save(user);
    }
    
    public boolean validateToken(String token) {
        try {
            jwtUtil.validateToken(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public String extractUsername(String token) {
        return jwtUtil.extractUsername(token);
    }
    
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}