package com.example.projectmg.Controller;

import com.example.projectmg.JPA.Profile;
import com.example.projectmg.Services.ProfileService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/profiles")
@AllArgsConstructor
public class UserProfileController {
    private final ProfileService service;

    @GetMapping
    public ResponseEntity<Profile> getAuthProfile(Authentication authentication) {
        return service.authProfile(authentication)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfile(@PathVariable Long id) {
        return service.getProfile(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Profile createProfile(@RequestBody Profile profile) {
        return service.createProfile(profile);
    }

    @PutMapping("/{id}")
    public Profile updateProfile(@PathVariable Long id, @RequestBody Profile profile) {
        return service.updateProfile(id, profile);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<Resource> getProfileImage(@PathVariable Long id) throws IOException {
        Resource resource = service.getProfileImage(id);
        System.out.println(resource);
        if(resource != null){
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(resource);
        }else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/{id}/image")
    public void uploadProfileImage(@PathVariable Long id, @RequestParam("image") MultipartFile image) throws IOException {
        service.uploadProfileImage(id, image);
    }
}
