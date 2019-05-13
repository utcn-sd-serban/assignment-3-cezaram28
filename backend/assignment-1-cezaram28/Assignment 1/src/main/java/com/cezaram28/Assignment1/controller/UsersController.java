package com.cezaram28.Assignment1.controller;

import com.cezaram28.Assignment1.dto.UserDTO;
import com.cezaram28.Assignment1.service.UserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UsersController {
    private final UserManagementService userService;

    @GetMapping("/users")
    public List<UserDTO> readAll() {
        return userService.listUsers();
    }

    @PostMapping("/users")
    public UserDTO create(@RequestBody UserDTO dto){
        return userService.addUser(dto);
    }

}
