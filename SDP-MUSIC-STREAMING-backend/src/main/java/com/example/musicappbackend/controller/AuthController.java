package com.example.musicappbackend.controller;

import com.example.musicappbackend.entity.User;
import com.example.musicappbackend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})

public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Signup endpoint
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        // default role "user" will be set automatically
        return ResponseEntity.ok(userService.saveUser(user));
    }

    // Login endpoint – now allows all users (no admin check)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        User user = userService.validateUser(loginData.getUsername(), loginData.getPassword());

        if (user != null) {
            return ResponseEntity.ok(user); // success
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
    }

    // Get all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
