package com.webafan.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class PortfolioApplication implements CommandLineRunner {

	@Value("${app.api.base.url}")
	private String apiBaseUrl;
	
	@Value("${app.frontend.url}")
	private String frontendUrl;
	
	@Value("${spring.datasource.url}")
	private String databaseUrl;

	public static void main(String[] args) {
		SpringApplication.run(PortfolioApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// Log startup information
		log.info("Portfolio Application started successfully!");
		log.info("API Base URL: {}", apiBaseUrl);
		log.info("Frontend URL: {}", frontendUrl);
		log.info("Database: {}", databaseUrl);
	}

}