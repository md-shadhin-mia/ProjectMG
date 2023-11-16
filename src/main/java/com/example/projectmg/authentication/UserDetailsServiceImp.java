package com.example.projectmg.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImp implements UserDetailsService {
    @Autowired
    UserRepository repository;
    /**
     * Loads a user by their username.
     *
     * @param  username  the username of the user to load
     * @return           the loaded user details
     * @throws UsernameNotFoundException  if the user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new UserDetailsImp(repository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("User not found")));
    }
}
