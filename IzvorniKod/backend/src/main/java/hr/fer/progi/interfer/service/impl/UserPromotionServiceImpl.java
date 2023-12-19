package hr.fer.progi.interfer.service.impl;

import hr.fer.progi.interfer.dto.request.UserPromotionDTO;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.entity.UserRole;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.UserPromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

// Ubija tri ptice jednim kamenom
@Service
public class UserPromotionServiceImpl implements UserPromotionService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> promote(UserPromotionDTO userDetails) {
        // Može ili promotati korisnika, ili istog demotati
        UserRole newRole;
        if (userDetails.getRole().equalsIgnoreCase("admin"))
            newRole = UserRole.ADMIN;
        else if (userDetails.getRole().equalsIgnoreCase("moderator"))
            newRole = UserRole.MODERATOR;
        else if (userDetails.getRole().equalsIgnoreCase("student"))
            newRole = UserRole.STUDENT;
        else
            return ResponseEntity.badRequest().body("\"role\" key must be either \"admin\", \"moderator\", or \"student\"");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User requestingUser = userRepository.findByEmail((String) authentication.getPrincipal());

        if (requestingUser == null)
            return ResponseEntity.internalServerError().body("Error getting user information");
        if (requestingUser.getRole() != UserRole.ADMIN)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only administrators can perform this action");

        Optional<User> promotedUser = userRepository.findById(userDetails.getId());
        if (promotedUser.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(userDetails);

        // Ali samo ako korisnik nije admin
        // Ali korisnik i u tom slučaju može demotati sebe
        if (promotedUser.get().getRole() == UserRole.ADMIN && !requestingUser.equals(promotedUser.get()))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Cannot update role for an administrator");

        promotedUser.get().setRole(newRole);
        return ResponseEntity.noContent().build();
    }

}
