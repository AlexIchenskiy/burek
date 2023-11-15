package hr.fer.progi.interfer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import hr.fer.progi.interfer.dto.request.UserRegistrationDTO;
import hr.fer.progi.interfer.service.impl.UserRegisterServiceImpl;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
    private UserRegisterServiceImpl userService;
	
	@PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid UserRegistrationDTO userDetails, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.toString());
        }
    	return userService.register(userDetails);
    }
	
	@GetMapping("/")
    public ResponseEntity<?> profile() {
    	return ResponseEntity.ok().body("User");		//nije implementirano do kraja, za test
    }

}
