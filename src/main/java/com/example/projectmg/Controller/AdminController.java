package com.example.projectmg.Controller;


import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin-pannel")
public class AdminController {
    @GetMapping
    public String index(Authentication authentication){
        return "Hello "+authentication.getName()+" !";
    }


}
