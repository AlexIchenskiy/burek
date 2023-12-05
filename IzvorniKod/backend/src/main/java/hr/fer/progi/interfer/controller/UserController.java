package hr.fer.progi.interfer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import hr.fer.progi.interfer.dto.request.UserLoginDTO;
import hr.fer.progi.interfer.dto.request.UserRegistrationDTO;
import hr.fer.progi.interfer.service.UserProfileService;
import hr.fer.progi.interfer.service.impl.UserLoginServiceImpl;
import hr.fer.progi.interfer.service.impl.UserProfileServiceImpl;
import hr.fer.progi.interfer.service.impl.UserRegisterServiceImpl;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
    private UserRegisterServiceImpl userRegisterService;
	
	@Autowired
    private UserLoginServiceImpl userLoginService;
	
	@Autowired
	private UserProfileServiceImpl userProfileService;
	
	@PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid UserRegistrationDTO userDetails, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.toString());
        }
    	return userRegisterService.register(userDetails);
    }
	
	@PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody @Valid UserLoginDTO userDetails, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.toString());
        }
    	return userLoginService.login(userDetails);
    }
	
	@GetMapping()
    public ResponseEntity<?> userProfile(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
    	return userProfileService.profile(authorizationHeader);
    }

}
