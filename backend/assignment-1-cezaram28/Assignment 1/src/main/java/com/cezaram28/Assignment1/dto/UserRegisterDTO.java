package com.cezaram28.Assignment1.dto;

import com.cezaram28.Assignment1.entity.User;
import lombok.Data;

@Data
public class UserRegisterDTO {
    private String username;
    private String password;
    private String email;

    public static UserRegisterDTO ofEntity(User user){
        UserRegisterDTO userRegisterDTO = new UserRegisterDTO();
        userRegisterDTO.setUsername(user.getUsername());
        userRegisterDTO.setPassword(user.getPassword());
        userRegisterDTO.setEmail(user.getEmail());
        return userRegisterDTO;
    }
}
