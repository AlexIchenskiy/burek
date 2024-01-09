package hr.fer.progi.interfer.service;

import hr.fer.progi.interfer.dto.request.UserPromotionDTO;
import org.springframework.http.ResponseEntity;

public interface UserPromotionService {

    ResponseEntity<?> promote(UserPromotionDTO userDetails);

}
