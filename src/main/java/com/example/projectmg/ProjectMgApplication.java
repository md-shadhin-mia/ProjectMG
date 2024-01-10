package com.example.projectmg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"com.example.projectmg.JPA", "com.example.projectmg.goal"})
@EnableJpaRepositories(basePackages = {"com.example.projectmg.JPA", "com.example.projectmg.goal"})
public class ProjectMgApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectMgApplication.class, args);
        System.out.println("Application Running");
    }

}
