package com.example.projectmg.Controller;

import com.example.projectmg.JPA.User;
import com.example.projectmg.JPA.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class homeController {
    UserRepository userRepository;
    @GetMapping
    public ResponseEntity<String> home(Authentication authentication){
        StringBuilder str = new StringBuilder()
                .append("username "+authentication.getName())
                .append("Details "+authentication.getPrincipal());
        return ResponseEntity
                .ok("user : "+str);
    }

    @GetMapping("/user/")
    public ResponseEntity<User> UserFind(Authentication authentication){
        return userRepository.findByUsername(authentication.getName())
                .map(ResponseEntity::ok)
                .orElseThrow(()->new UsernameNotFoundException("You are not found!"));
    }

}
