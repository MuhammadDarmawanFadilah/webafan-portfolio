package com.webafan.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Convert relative path to absolute path
        String absoluteUploadPath;
        if (uploadDir.startsWith("/") || uploadDir.contains(":")) {
            // Already absolute path
            absoluteUploadPath = uploadDir;
        } else {
            // Relative path - make it absolute from current working directory
            absoluteUploadPath = System.getProperty("user.dir") + "/" + uploadDir;
        }
        
        // Ensure path ends with separator
        if (!absoluteUploadPath.endsWith("/") && !absoluteUploadPath.endsWith("\\")) {
            absoluteUploadPath += "/";
        }
        
        // Serve uploaded files from /uploads/** URL pattern
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + absoluteUploadPath);
        
        // Note: /api/upload/files/** is handled by FileUploadController
        // We don't need to add resource handler for it as it's handled by the controller
    }
}