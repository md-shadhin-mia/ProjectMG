package com.example.projectmg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.security.core.SpringSecurityCoreVersion;

@SpringBootApplication()
public class ProjectMgApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectMgApplication.class, args);
        System.out.println("Application Running");
    }

}
