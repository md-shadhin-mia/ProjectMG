package com.example.projectmg.Services;

import com.example.projectmg.JPA.Profile;
import com.example.projectmg.JPA.ProfileRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Optional;

@Service

public class ProfileService {
    @Autowired
    private ProfileRepository repository;

    @Value("${app.upload.path}")
    private String uploadPath;

    public Optional<Profile> authProfile(Authentication authentication) {
        return repository.findByUserUsername(authentication.getName());
    }
    public Optional<Profile> getProfile(Long id) {
        return repository.findById(id);
    }

    public Profile createProfile(Profile profile) {
        return repository.save(profile);
    }

    public Profile updateProfile(Long id, Profile profile) {
        Profile existingProfile = repository.findById(id).orElseThrow();
        existingProfile.setMobileNumber(profile.getMobileNumber());
        existingProfile.setEmail(profile.getEmail());
        existingProfile.setProfession(profile.getProfession());
        existingProfile.setLocation(profile.getLocation());
        existingProfile.setDetails(profile.getDetails());
        return repository.save(existingProfile);
    }

    public void deleteProfile(Long id) {
        repository.deleteById(id);
    }

    public void uploadProfileImage(Long id, MultipartFile image) throws IOException {
        Profile profile = repository.findById(id).orElseThrow();
        String fileName = id + "-" + image.getOriginalFilename();
        File file = new File(uploadPath + fileName);
        image.transferTo(file);
        System.out.println("uploaded");
        profile.setProfileImage(fileName);
        repository.save(profile);
    }

    public Resource getProfileImage(Long id) throws MalformedURLException {
        Profile profile = repository.findById(id).orElseThrow();
        String fileName = profile.getProfileImage();
        File file = new File(uploadPath + fileName);
        if(file.exists()) {
            return new UrlResource(file.toURI());
        } else {
            return null;
        }
    }
}
