package com.cezaram28.Assignment1.service;

import com.cezaram28.Assignment1.entity.User;
import com.cezaram28.Assignment1.exception.UserNotFoundException;
import com.cezaram28.Assignment1.repository.RepositoryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserLoginDetailsService implements UserDetailsService {
    private final RepositoryFactory repositoryFactory;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = repositoryFactory.createUserRepository().findByName(s).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
    }

    @Transactional
    public User loadCurrentUser(){
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        return repositoryFactory.createUserRepository().findByName(name).orElseThrow(UserNotFoundException::new);
    }
}
