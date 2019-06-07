package com.cezaram28.Assignment1.controller;

import com.cezaram28.Assignment1.dto.UserDTO;
import com.cezaram28.Assignment1.dto.UserRegisterDTO;
import com.cezaram28.Assignment1.entity.User;
import com.cezaram28.Assignment1.service.UserLoginDetailsService;
import com.cezaram28.Assignment1.service.UserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UsersController {
    private final UserManagementService userService;
    private final UserLoginDetailsService userLoginDetailsService;

    @GetMapping("/users")
    public List<UserDTO> readAll() {
        return userService.listUsers();
    }

    @PostMapping("/users")
    public UserDTO create(@RequestBody UserRegisterDTO dto) {
        return userService.addUser(dto);
    }

    @PutMapping("/users/{id}/ban")
    public UserDTO ban(@PathVariable int id, @RequestBody UserDTO user) {
        return userService.ban(id, user);
    }

    @GetMapping("/login")
    public UserDTO login(){
        User logged = userLoginDetailsService.loadCurrentUser();
        return UserDTO.ofEntity(logged);
    }
}
