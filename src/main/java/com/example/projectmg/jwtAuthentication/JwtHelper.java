package com.example.projectmg.jwtAuthentication;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtHelper {
    private String jwtSecret="i4rouf98u3q49w8u9ase98d9w3q9e98w3da98ej83i4rouf98u3q49w8u9ase98d9w3q9e98w3da98ej83i4rouf98u3q49w8u9ase98d9w3q9e98w3da98ej83";

    private long jwtExpirationInMs=60*60*24;

    /**
     * Generates a JWT token for the given user details.
     *
     * @param  userDetails  the user details to generate the token for
     * @return              the generated JWT token
     */
    public String generateToken(UserDetails userDetails){
        Date now = new Date();
        Date expiryDate = new Date(now.getTime()+jwtExpirationInMs);
        Map<String, Object> claims = new java.util.HashMap<>();
        claims.put("version", "1.0");
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .addClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }

    /**
     * Retrieves the username from the given token.
     *
     * @param  token  the token containing the username
     * @return        the username extracted from the token
     */
    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Retrieves the expiration date from the given token.
     *
     * @param  token  the token from which to extract the expiration date
     * @return        the expiration date extracted from the token
     */

    public Date getExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Checks if the given token has expired.
     *
     * @param  token  the token to check
     * @return        true if the token has expired, false otherwise
     */
    public Boolean isTokenExpired(String token){
        return getExpiration(token).before(new Date());
    }

    /**
     * Checks if the given token has expired.
     *
     * @param  token  the token to check
     * @return        true if the token has expired, false otherwise
     */
    public Boolean isValidToken(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * Extracts a specific claim from a JWT token.
     *
     * @param  token          the JWT token to extract the claim from
     * @param  claimsResolver a function that resolves the claim from the token's claims
     * @return                the extracted claim
     */

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extracts all claims from the given JWT token.
     *
     * @param  token  the JWT token to extract claims from
     * @return        the extracted claims
     */
    private Claims extractAllClaims(String token){
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
    }

}
