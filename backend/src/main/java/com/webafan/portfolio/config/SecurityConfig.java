package com.webafan.portfolio.config;

import com.webafan.portfolio.service.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Value("${spring.web.cors.allowed-origins}")
    private String allowedOrigins;
    
    public SecurityConfig(UserDetailsServiceImpl userDetailsService,
                         JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints - authentication not required
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/contacts/submit").permitAll()
                // Public GET endpoints for portfolio display
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/profiles").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/profiles/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/projects").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/projects/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/experiences").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/experiences/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/skills").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/skills/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/educations").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/educations/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/achievements").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/achievements/**").permitAll()
                // Public file access
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/upload/files/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.HEAD, "/api/upload/files/**").permitAll()
                // ALL OTHER ENDPOINTS (POST, PUT, DELETE) REQUIRE AUTHENTICATION
                .anyRequest().authenticated()
             );
        
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        // Security headers configuration
        http.headers(headers -> headers.frameOptions().deny());
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Use environment variable for allowed origins
        String[] origins = allowedOrigins.split(",");
        for (String origin : origins) {
            configuration.addAllowedOrigin(origin.trim());
        }
        
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}