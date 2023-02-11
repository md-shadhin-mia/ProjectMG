package com.example.projectmg;

import com.example.projectmg.JPA.UserRepository;
import com.example.projectmg.Services.UserDetailsServiceImpl;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.web.SecurityFilterChain;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Instant;
import java.util.stream.Collectors;


@Configuration
public class SecurityConfig {
    @Value("${jwt.public.key}")
    RSAPublicKey publicKey;
    @Value("${jwt.private.key}")
    RSAPrivateKey privateKey;
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserDetailsServiceImpl userDetailsService;
/*    @Bean
    public UserDetailsService userDetailsService(){
        UserDetailsService userNotFound = new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                System.out.println(username);
                var user = userRepository.findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
                System.out.println(user);

                return new CustomUserDetails(user);
            }
        };
        return userNotFound;
    }*/
    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userDetailsService);
        auth.setPasswordEncoder(passwordEncoder());
        return auth;
    }
    public void customizeTokenResponse(FormLoginConfigurer<HttpSecurity> form) {
        form
        .usernameParameter("username")
        .passwordParameter("password")
        .loginProcessingUrl("/api/auth/login")
        .successHandler((request, response, authentication) -> {
            // generate the token
            Instant now = Instant.now();
            long expiry = 36000L;
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
            String token = SecurityConfig.this.jwtEncoder().encode(JwtEncoderParameters.from(claims)).getTokenValue();
            response.setContentType("application/json");
            response.getWriter().write("{\"token\":\""+token+"\"}");
        })

        .failureHandler((request, response, exception) -> {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized: Login failed");
        });
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeRequests((authorize)->authorize
                    .requestMatchers("/api/auth/register").permitAll()
                    .requestMatchers("/*").permitAll()
                    .requestMatchers("/api/**").authenticated()
            )
            .csrf().disable()
            .formLogin(this::customizeTokenResponse)
            .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
            .sessionManagement((session)->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(
                (exception)->exception
                    .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
                    .accessDeniedHandler(new BearerTokenAccessDeniedHandler())
            );
        return http.build();
    }

    @Bean
    JwtDecoder jwtDecoder(){
        return NimbusJwtDecoder.withPublicKey(this.publicKey).build();
    }

    @Bean
    JwtEncoder jwtEncoder(){
        JWK jwk = new RSAKey.Builder(this.publicKey).privateKey(privateKey).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }
}
