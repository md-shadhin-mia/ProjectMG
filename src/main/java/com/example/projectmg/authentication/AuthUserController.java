package com.example.projectmg.authentication;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth-users")
@AllArgsConstructor
public class AuthUserController {
    private final UserService userService;

    //Crud
    @GetMapping
    public List<User> allUsers() {
        return userService.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody UserDto userDto) {
        return userService.create(userDto);
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        userDto.setId(id);
        return userService.update(id, userDto);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }
}