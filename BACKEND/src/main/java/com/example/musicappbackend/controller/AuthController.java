package com.example.musicappbackend.controller;

import com.example.musicappbackend.entity.User;
import com.example.musicappbackend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // TEMP: Allow all frontends
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Signup endpoint
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        System.out.println("🔥 /api/signup called!");
        return ResponseEntity.ok(userService.saveUser(user));
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        System.out.println("🔐 /api/login called!");

        User user = userService.validateUser(loginData.getUsername(), loginData.getPassword());

        if (user != null) {
            System.out.println("✔ Login Success for: " + user.getUsername());
            return ResponseEntity.ok(user);
        } else {
            System.out.println("❌ Login Failed!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
    }

    // Get all users - PUBLIC for testing 💥
    @GetMapping("/users")
    @CrossOrigin(origins = "*") // TEMP: Allow without auth
    public ResponseEntity<List<User>> getAllUsers() {
        System.out.println("📌 PUBLIC: /api/users called!");
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
