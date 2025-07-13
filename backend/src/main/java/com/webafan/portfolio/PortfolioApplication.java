package com.webafan.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:5173")
public class PortfolioApplication {

	public static void main(String[] args) {
		SpringApplication.run(PortfolioApplication.class, args);
		System.out.println("\n=== Portfolio Backend API Started ===");
		System.out.println("API Base URL: http://localhost:8080/api");
		System.out.println("Frontend URL: http://localhost:5173");
		System.out.println("Database: MySQL (localhost:3306/portfolio_db)");
		System.out.println("======================================\n");
	}

}