package com.webafan.portfolio.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")

public class FileUploadController {

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    @PostMapping("/image")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
        Map<String, String> response = new HashMap<>();
        
        try {
            // Validate file
            if (file.isEmpty()) {
                response.put("error", "Please select a file to upload");
                return ResponseEntity.badRequest().body(response);
            }

            // Validate file type
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                response.put("error", "Only image files are allowed");
                return ResponseEntity.badRequest().body(response);
            }

            // Validate file size (max 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                response.put("error", "File size must be less than 5MB");
                return ResponseEntity.badRequest().body(response);
            }

            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

            // Save file
            Path filePath = uploadPath.resolve(uniqueFilename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Return file URL
            String fileUrl = "/api/upload/files/" + uniqueFilename;
            response.put("url", fileUrl);
            response.put("filename", uniqueFilename);
            response.put("originalName", originalFilename);
            response.put("size", String.valueOf(file.getSize()));
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            response.put("error", "Failed to upload file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/cv")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> uploadCV(@RequestParam("file") MultipartFile file) {
        Map<String, String> response = new HashMap<>();
        
        try {
            // Validate file
            if (file.isEmpty()) {
                response.put("error", "Please select a file to upload");
                return ResponseEntity.badRequest().body(response);
            }

            // Validate file type (PDF, DOC, DOCX)
            String contentType = file.getContentType();
            if (contentType == null || 
                (!contentType.equals("application/pdf") && 
                 !contentType.equals("application/msword") && 
                 !contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))) {
                response.put("error", "Only PDF and Word documents are allowed");
                return ResponseEntity.badRequest().body(response);
            }

            // Validate file size (max 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                response.put("error", "File size must be less than 5MB");
                return ResponseEntity.badRequest().body(response);
            }

            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String uniqueFilename = "CV_" + UUID.randomUUID().toString() + fileExtension;

            // Save file
            Path filePath = uploadPath.resolve(uniqueFilename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Return file URL
            String fileUrl = "/api/upload/files/" + uniqueFilename;
            response.put("fileUrl", fileUrl);
            response.put("filename", uniqueFilename);
            response.put("originalName", originalFilename);
            response.put("size", String.valueOf(file.getSize()));
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            response.put("error", "Failed to upload CV: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/files/{filename}")
    public ResponseEntity<byte[]> getFile(@PathVariable String filename) {
        return handleFileRequest(filename, false);
    }

    @RequestMapping(value = "/files/{filename}", method = RequestMethod.HEAD)
    public ResponseEntity<byte[]> getFileHead(@PathVariable String filename) {
        return handleFileRequest(filename, true);
    }

    private ResponseEntity<byte[]> handleFileRequest(@PathVariable String filename, boolean headOnly) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename);
            
            if (!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }

            // Determine content type
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            if (headOnly) {
                // For HEAD requests, only return headers without body
                return ResponseEntity.ok()
                        .header("Content-Type", contentType)
                        .header("Content-Disposition", "inline; filename=\"" + filename + "\"")
                        .header("Content-Length", String.valueOf(Files.size(filePath)))
                        .build();
            } else {
                // For GET requests, return full content
                byte[] fileContent = Files.readAllBytes(filePath);
                return ResponseEntity.ok()
                        .header("Content-Type", contentType)
                        .header("Content-Disposition", "inline; filename=\"" + filename + "\"")
                        .body(fileContent);
            }
                    
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/files/{filename}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deleteFile(@PathVariable String filename) {
        Map<String, String> response = new HashMap<>();
        
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename);
            
            if (!Files.exists(filePath)) {
                response.put("error", "File not found");
                return ResponseEntity.notFound().build();
            }

            Files.delete(filePath);
            response.put("message", "File deleted successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            response.put("error", "Failed to delete file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}