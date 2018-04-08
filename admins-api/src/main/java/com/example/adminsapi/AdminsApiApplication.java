package com.example.adminsapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class AdminsApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminsApiApplication.class, args);
	}
}
