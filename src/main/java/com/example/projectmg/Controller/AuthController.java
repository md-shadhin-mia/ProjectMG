package com.example.projectmg.Controller;

import com.example.projectmg.JPA.Profile;
import com.example.projectmg.JPA.RegisterUser;
import com.example.projectmg.JPA.User;
import com.example.projectmg.JPA.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private JwtEncoder encoder;

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterUser regUser){
        System.out.println(regUser);
        User user = new User();
        user.setUsername(regUser.getUsername());
        user.setFirstName(regUser.getFirstName());
        user.setLastName(regUser.getLastName());
        user.setPassword(passwordEncoder.encode(regUser.getPassword()));
        Profile profile = new Profile();
        profile.setUser(user);
        user.setProfile(profile);
        userRepository.save(user);

        return ResponseEntity.ok("you are registered. you have to login now");
    }
    @PostMapping("/login")
    public String login(Authentication authentication) {
        System.out.println("hello "+authentication.getName());
        Instant now = Instant.now();
        long expiry = 36000L;
        // @formatter:off
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(authentication.getName())
                .claim("scope", scope)
                .build();
        // @formatter:on
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
    @GetMapping("/do")
    public String dong(){
        return "Dong";
    }

    public JwtEncoder getEncoder() {
        return encoder;
    }
@Autowired
    public void setEncoder(JwtEncoder encoder) {
        this.encoder = encoder;
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }
@Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public PasswordEncoder getPasswordEncoder() {
        return passwordEncoder;
    }
@Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
}
