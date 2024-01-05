package com.example.projectmg.Controller;

import com.example.projectmg.JPA.Profile;
import com.example.projectmg.JPA.RegisterUser;
import com.example.projectmg.JPA.User;
import com.example.projectmg.JPA.UserRepository;
import com.example.projectmg.Services.ProfileService;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private ProfileService profileService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterUser regUser) {
        try {
            if (userRepository.findByUsername(regUser.getUsername()).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Username already exists"));
            }
            User user = new User();
            user.setUsername(regUser.getUsername());
            user.setFirstName(regUser.getFirstName());
            user.setLastName(regUser.getLastName());
            user.setPassword(passwordEncoder.encode(regUser.getPassword()));
            User savedUser = userRepository.save(user);

            Profile profile = new Profile();
            profile.setEmail(regUser.getUsername());
            profile.setUser(savedUser);
            profileService.createProfile(profile);

            return ResponseEntity.ok(Map.of("message", "Registered successfully", "username", savedUser.getUsername()));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username already exists"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Registration failed: " + e.getMessage()));
        }
    }

    @GetMapping("/do")
    public String dong() {
        return "Dong";
    }
}
