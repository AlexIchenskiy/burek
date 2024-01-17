package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

public interface UserBanService {

    ResponseEntity<?> ban(long id);

    ResponseEntity<?> unban(long id);

}
