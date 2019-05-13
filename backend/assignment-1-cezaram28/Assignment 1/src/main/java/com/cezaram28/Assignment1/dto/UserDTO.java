package com.cezaram28.Assignment1.dto;

import com.cezaram28.Assignment1.entity.User;
import lombok.Data;

@Data
public class UserDTO {
    private Integer id;
    private String username;
    private String email;
    private Integer score;
    private Boolean isAdmin;
    private Boolean isBanned;

    public static UserDTO ofEntity(User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setScore(user.getScore());
        userDTO.setIsAdmin(user.getIsAdmin());
        userDTO.setIsBanned(user.getIsBanned());
        return userDTO;
    }

    public static User toEntity(UserDTO userDTO){
        User user = new User();
        user.setId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setScore(userDTO.getScore());
        user.setIsAdmin(userDTO.getIsAdmin());
        user.setIsBanned(userDTO.getIsBanned());
        return user;
    }
}
