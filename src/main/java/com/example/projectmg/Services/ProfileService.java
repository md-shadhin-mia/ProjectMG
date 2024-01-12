package com.example.projectmg.Services;

import com.example.projectmg.JPA.Profile;
import com.example.projectmg.JPA.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    
    @Value("${app.upload.path}")
    private String uploadPath;
    
    public Optional<Profile> authProfile(Authentication authentication) {
        return profileRepository.findByUserUsername(authentication.getName());
    }
    
    public Optional<Profile> getProfile(Long id) {
        return profileRepository.findById(id);
    }
    
    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }
    
    public Profile updateProfile(Long id, Profile profile) {
        return profileRepository.findById(id).map(existing -> {
            if (profile.getMobileNumber() != null) existing.setMobileNumber(profile.getMobileNumber());
            if (profile.getEmail() != null) existing.setEmail(profile.getEmail());
            if (profile.getProfession() != null) existing.setProfession(profile.getProfession());
            if (profile.getLocation() != null) existing.setLocation(profile.getLocation());
            if (profile.getDetails() != null) existing.setDetails(profile.getDetails());
            if (profile.getDescription() != null) existing.setDescription(profile.getDescription());
            return profileRepository.save(existing);
        }).orElseThrow(() -> new java.util.NoSuchElementException("Profile not found"));
    }
    
    public Resource getProfileImage(Long id) throws IOException {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new java.util.NoSuchElementException("Profile not found"));
        if (profile.getProfileImage() == null) return null;
        
        Path path = Paths.get(uploadPath).resolve(profile.getProfileImage());
        return new UrlResource(path.toUri());
    }
    
    public void uploadProfileImage(Long id, MultipartFile file) throws IOException {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new java.util.NoSuchElementException("Profile not found"));
        
        if (!Files.exists(Paths.get(uploadPath))) {
            Files.createDirectories(Paths.get(uploadPath));
        }
        
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path targetLocation = Paths.get(uploadPath).resolve(fileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        
        profile.setProfileImage(fileName);
        profileRepository.save(profile);
    }
}
