package com.example.projectmg.Controller;

import lombok.AllArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class homeController {
    @GetMapping
    public ResponseEntity getInfo(){
        Map info = new HashMap();
        info.put("api_url", "/api");
        info.put("api_doc", "/doc");
        return ResponseEntity.ok(info);
    }
}
