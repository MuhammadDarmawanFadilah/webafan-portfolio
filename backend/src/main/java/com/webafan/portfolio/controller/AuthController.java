package com.webafan.portfolio.controller;

import com.webafan.portfolio.entity.User;
import com.webafan.portfolio.service.AuthService;
import com.webafan.portfolio.repository.UserRepository;
import com.webafan.portfolio.dto.LoginRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.validation.Valid;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${spring.web.cors.allowed-origins}")
public class AuthController {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        logger.info("=== TEST ENDPOINT CALLED ===");
        return ResponseEntity.ok("Server is working!");
    }
    
    public AuthController(AuthService authService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            logger.info("=== LOGIN ENDPOINT CALLED ===");
            logger.info("Username received: {}", loginRequest.getUsername());
            logger.info("Password length: {}", loginRequest.getPassword() != null ? loginRequest.getPassword().length() : "null");
            
            Map<String, Object> response = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
            
            logger.info("✅ Login successful for user: {}", loginRequest.getUsername());
            return ResponseEntity.ok(response);
            
        } catch (BadCredentialsException e) {
            logger.error("❌ BadCredentialsException - {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        } catch (Exception e) {
            logger.error("❌ Unexpected error during login", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Internal server error"));
        }
    }
    
    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                boolean isValid = authService.validateToken(token);
                
                if (isValid) {
                    String username = authService.extractUsername(token);
                    return ResponseEntity.ok(Map.of(
                        "valid", true,
                        "username", username
                    ));
                }
            }
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("valid", false, "message", "Invalid token"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("valid", false, "message", e.getMessage()));
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Since we're using stateless JWT, logout is handled on the client side
        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }
    
    @GetMapping("/debug")
    public ResponseEntity<?> debug() {
        try {
            var user = authService.findByUsername("afan");
            if (user.isPresent()) {
                return ResponseEntity.ok(Map.of(
                    "username", user.get().getUsername(),
                    "isActive", user.get().getIsActive(),
                    "passwordHash", user.get().getPassword().substring(0, 20) + "...",
                    "role", user.get().getRole().name()
                ));
            } else {
                return ResponseEntity.ok(Map.of("message", "User not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/test-password")
    public ResponseEntity<?> testPassword(@RequestBody Map<String, String> request) {
        try {
            String password = request.get("password");
            var user = authService.findByUsername("afan");
            if (user.isPresent()) {
                boolean matches = authService.checkPassword(password, user.get().getPassword());
                return ResponseEntity.ok(Map.of(
                    "password", password,
                    "matches", matches,
                    "storedHash", user.get().getPassword().substring(0, 20) + "..."
                ));
            } else {
                return ResponseEntity.ok(Map.of("message", "User not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("error", e.getMessage()));
        }
    }
    
    // DTO Classes
    public static class LoginRequest {
        private String username;
        private String password;
        
        public LoginRequest() {}
        
        public LoginRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }
        
        public String getUsername() {
            return username;
        }
        
        public void setUsername(String username) {
            this.username = username;
        }
        
        public String getPassword() {
            return password;
        }
        
        public void setPassword(String password) {
            this.password = password;
        }
    }
}