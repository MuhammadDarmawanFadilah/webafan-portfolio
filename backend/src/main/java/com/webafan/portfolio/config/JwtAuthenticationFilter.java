package com.webafan.portfolio.config;

import com.webafan.portfolio.service.UserDetailsServiceImpl;
import com.webafan.portfolio.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;
    
    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserDetailsServiceImpl userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response,
                                  FilterChain filterChain) throws ServletException, IOException {
        
        String requestURI = request.getRequestURI();
        String method = request.getMethod();
        logger.info("=== JWT FILTER: Processing {} {}", method, requestURI);
        
        // Skip JWT processing only for authentication endpoints and contact form
        if (requestURI.startsWith("/api/auth/") || requestURI.equals("/api/contacts/submit")) {
            logger.info("=== JWT FILTER: Skipping JWT processing for auth endpoint: {} {}", method, requestURI);
            filterChain.doFilter(request, response);
            return;
        }
        
        // Skip JWT processing for public GET requests (portfolio display)
        if (method.equals("GET") && (
                requestURI.startsWith("/api/profiles/public") ||
                requestURI.startsWith("/api/projects/public") ||
                requestURI.startsWith("/api/experiences/public") ||
                requestURI.startsWith("/api/skills/public") ||
                requestURI.startsWith("/api/educations/public") ||
                requestURI.startsWith("/api/achievements/public"))) {
            logger.info("=== JWT FILTER: Skipping JWT processing for public GET endpoint: {} {}", method, requestURI);
            filterChain.doFilter(request, response);
            return;
        }
        
        logger.info("=== JWT FILTER: Processing authenticated endpoint: {} {}", method, requestURI);
        
        final String authorizationHeader = request.getHeader("Authorization");
        logger.info("=== JWT FILTER: Authorization header: {}", authorizationHeader != null ? "Present" : "Not present");
        
        String username = null;
        String jwt = null;
        
        // Extract JWT from Authorization header
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwt);
            } catch (Exception e) {
                logger.error("Error extracting username from JWT: " + e.getMessage());
            }
        }
        
        // Validate token and set authentication
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                logger.info("=== JWT FILTER: User loaded - Username: {}, Authorities: {}", username, userDetails.getAuthorities());
                
                if (jwtUtil.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = 
                        new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    logger.info("=== JWT FILTER: Authentication set successfully for user: {}", username);
                } else {
                    logger.error("=== JWT FILTER: Token validation failed for user: {}", username);
                }
            } catch (Exception e) {
                logger.error("=== JWT FILTER: Error validating JWT token: " + e.getMessage());
            }
        }
        
        logger.info("=== JWT FILTER: Continuing filter chain for {} {}", method, requestURI);
        filterChain.doFilter(request, response);
        logger.info("=== JWT FILTER: Completed processing {} {}", method, requestURI);
    }
}