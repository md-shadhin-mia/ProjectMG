package com.example.projectmg.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class homeController {
    @GetMapping
    public ResponseEntity<String> home(Authentication authentication){
        StringBuilder str = new StringBuilder()
                .append("username "+authentication.getName())
                .append("Details "+authentication.getPrincipal());
        return ResponseEntity
                .ok("user : "+str);
    }

}
