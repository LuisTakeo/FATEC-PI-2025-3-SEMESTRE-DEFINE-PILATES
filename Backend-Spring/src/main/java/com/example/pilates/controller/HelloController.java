package com.example.pilates.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
    @GetMapping("/api/hello")
    public String hello() {
        return "Hello World from Spring Boot - Define Pilates API";
    }
    
    @GetMapping("/")
    public String home() {
        return "Define Pilates API is running!";
    }
}