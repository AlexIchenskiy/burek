package hr.fer.progi.interfer.controller;

import hr.fer.progi.interfer.dto.request.UserEditDTO;
import hr.fer.progi.interfer.service.impl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import hr.fer.progi.interfer.dto.request.UserLoginDTO;
import hr.fer.progi.interfer.dto.request.UserRegistrationDTO;
import hr.fer.progi.interfer.dto.request.UserPromotionDTO;
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

    @Autowired
    private UserDeleteServiceImpl userDeleteService;

    @Autowired
    private UserPromotionServiceImpl userPromotionService;

    @Autowired UserBanServiceImpl userBanService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid UserRegistrationDTO userDetails,
            BindingResult bindingResult) {
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

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        return userProfileService.getUserById(id);
    }

    @PostMapping("/edit")
    public ResponseEntity<?> editUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @RequestBody @Valid UserEditDTO userDetails, BindingResult bindingResult) {
        return userProfileService.edit(authorizationHeader, userDetails);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        return userDeleteService.delete(authorizationHeader);
    }

    @PostMapping("/promote")
    public ResponseEntity<?> promoteUser(@RequestBody @Valid UserPromotionDTO userDetails, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return ResponseEntity.badRequest().body("{ \"id\": number, \"rank\": string }");

        return userPromotionService.promote(userDetails);
    }
    
    @GetMapping("/check/{mail}")
    public ResponseEntity<?> checkUser(@PathVariable String mail) {
        return userProfileService.chackUser(mail);
    }

    @PostMapping("/ban/{id}")
    public ResponseEntity<?> banUser(@PathVariable long id) {
        return userBanService.ban(id);
    }

    @PostMapping("/unban/{id}")
    public ResponseEntity<?> unbanUser(@PathVariable long id) {
        return userBanService.unban(id);
    }
    
    @GetMapping("/getAll")
    public ResponseEntity<?> getAllUsers (@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
    	return userProfileService.getAll(authorizationHeader);
    }

}
