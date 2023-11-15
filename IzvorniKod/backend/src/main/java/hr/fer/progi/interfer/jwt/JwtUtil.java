package hr.fer.progi.interfer.jwt;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
	
	private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

	@Value("${jwt.secret}")
	private String jwtSecret;

	@Value("${jwt.expirationInMs}")
	private int jwtExpirationMs;
	
	@Autowired
	private UserRepository userRepository;

	public String getEmailFromToken(String token) {
		return Jwts.parser().setSigningKey(key()).parseClaimsJws(token).getBody().getSubject();
	}

	private byte[] key() {
		return jwtSecret.getBytes();
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(key()).parse(token);
			return userRepository.existsByEmail(getEmailFromToken(token));
			
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		}

		return false;
	}

	
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, key()).compact();
    }
}