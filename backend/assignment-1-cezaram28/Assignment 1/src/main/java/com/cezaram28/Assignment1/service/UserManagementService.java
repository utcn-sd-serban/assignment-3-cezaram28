package com.cezaram28.Assignment1.service;

import com.cezaram28.Assignment1.dto.UserDTO;
import com.cezaram28.Assignment1.dto.UserRegisterDTO;
import com.cezaram28.Assignment1.entity.User;
import com.cezaram28.Assignment1.exception.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.cezaram28.Assignment1.repository.RepositoryFactory;
import com.cezaram28.Assignment1.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserManagementService {
    private final RepositoryFactory repositoryFactory;

    @Transactional
    public List<UserDTO> listUsers() {
        return repositoryFactory.createUserRepository().findAll()
                .stream().map(UserDTO::ofEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDTO addUser(String username, String password, String email) {
        List<UserDTO> users = listUsers();

        for(UserDTO u : users) {
            if(u.getUsername().equals(username) || u.getEmail().equals(email)){
                throw new UserExistsException();
            }
        }
        return UserDTO.ofEntity(repositoryFactory.createUserRepository().save(new User(username, password, email)));
    }

    @Transactional
    public UserDTO addUser(UserDTO userDTO) {
        User user = UserDTO.toEntity(userDTO);
        return UserDTO.ofEntity(repositoryFactory.createUserRepository().save(user));
    }

    @Transactional
    public void removeUser(int id) {
        UserRepository repository = repositoryFactory.createUserRepository();
        User user = repository.findById(id).orElseThrow(UserNotFoundException::new);
        repository.remove(user);
    }

    @Transactional
    public UserDTO findById(int id) {
        return UserDTO.ofEntity(repositoryFactory.createUserRepository().findById(id).orElseThrow(UserNotFoundException::new));
    }

    @Transactional
    public UserDTO findByCredentials(String username, String password) {
        User u = repositoryFactory.createUserRepository().findByCredentials(username,password).orElseThrow(BadCredentialsException::new);
        if(u.getIsBanned()) throw new BannedUserException();
        return UserDTO.ofEntity(u);
    }

    @Transactional
    public UserDTO ban(int id, User user) {
        if(!user.getIsAdmin()) throw new NoAdminException();
        UserDTO u = findById(id);
        u.setIsBanned(true);
        addUser(u);
        return u;
    }

    @Transactional
    public UserDTO makeAdmin(int id, User user) {
        if(!user.getIsAdmin()) throw new NoAdminException();
        UserDTO u = findById(id);
        u.setIsAdmin(true);
        addUser(u);
        return u;
    }
}
