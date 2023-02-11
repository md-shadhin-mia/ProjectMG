package com.example.projectmg.Controller;

import com.example.projectmg.JPA.Profile;
import com.example.projectmg.JPA.RegisterUser;
import com.example.projectmg.JPA.User;
import com.example.projectmg.JPA.UserRepository;
import com.example.projectmg.Services.ProfileService;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
public class AuthController {
    private JwtEncoder encoder;
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;
    private ProfileService profileService;
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterUser regUser){
        System.out.println(regUser);
        User user = new User();
        user.setUsername(regUser.getUsername());
        user.setFirstName(regUser.getFirstName());
        user.setLastName(regUser.getLastName());
        user.setPassword(passwordEncoder.encode(regUser.getPassword()));
        Profile profile = new Profile();
        profile.setEmail(regUser.getUsername());
        profile.setUser(userRepository.save(user));
        profileService.createProfile(profile);
        return ResponseEntity.ok("you are registered. you have to login now");
    }
//      @GetMapping("/login-success")
//        public String login(Authentication authentication) {
//        Instant now = Instant.now();
//        long expiry = 36000L;
//        String scope = authentication.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .collect(Collectors.joining(" "));
//        JwtClaimsSet claims = JwtClaimsSet.builder()
//                .issuer("self")
//                .issuedAt(now)
//                .expiresAt(now.plusSeconds(expiry))
//                .subject(authentication.getName())
//                .claim("scope", scope)
//                .build();
//        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
//    }
    @GetMapping("/do")
    public String dong(){
        return "Dong";
    }
}
