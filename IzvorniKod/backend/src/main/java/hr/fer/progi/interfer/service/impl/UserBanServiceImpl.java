package hr.fer.progi.interfer.service.impl;

import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.entity.UserRole;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.UserBanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserBanServiceImpl implements UserBanService {

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<?> ban(long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail((String) authentication.getPrincipal());

        if (user == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting requester's information");
        if (user.getRole() == UserRole.STUDENT)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authorized to ban users");

        Optional<User> bannedUser = userRepository.findById(id);
        if (bannedUser.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(id);

        if (bannedUser.get().getRole() == UserRole.ADMIN)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Can't ban an ADMIN");

        bannedUser.get().setRole(UserRole.STUDENT);
        bannedUser.get().setBanned(true);
        userRepository.save(bannedUser.get());

        return ResponseEntity.ok("");
    }

    @Override
    public ResponseEntity<?> unban(long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail((String) authentication.getPrincipal());

        if (user == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting requester's information");
        if (user.getRole() == UserRole.STUDENT)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authorized to unban users");

        Optional<User> unbannedUser = userRepository.findById(id);
        if (unbannedUser.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(id);

        unbannedUser.get().setBanned(false);
        userRepository.save(unbannedUser.get());

        return ResponseEntity.ok("");
    }

}
