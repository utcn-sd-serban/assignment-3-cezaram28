package com.cezaram28.Assignment1.repository;

import com.cezaram28.Assignment1.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    List<User> findAll();
    User save(User user);
    void remove(User user);
    void deleteAll();
    Optional<User> findById(int id);
    Optional<User> findByName(String username);
    Optional<User> findByCredentials(String username, String password);
}
