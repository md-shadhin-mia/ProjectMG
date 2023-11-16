package com.example.projectmg.authentication;

import com.example.projectmg.core.BaseService;
import com.example.projectmg.jwtAuthentication.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService extends BaseService<User, UserDto>{
    private final UserRepository repository;
    private final JwtHelper jwtHelper;

    @Autowired
    private PasswordEncoder passwordEncoder;
    public UserService(UserRepository repository, JwtHelper jwtHelper, PasswordEncoder passwordEncoder) {
        super(repository);
        this.repository = repository;
        this.jwtHelper = jwtHelper;
    }




    public String login(UsernamePasswordDto usernamePasswordDto) {
        User user = repository.findByUsername(usernamePasswordDto.getUsername()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (passwordEncoder.matches(usernamePasswordDto.getPassword(), user.getPassword())) {
            return jwtHelper.generateToken(new UserDetailsImp(user));
        }
        throw new IllegalAccessError("Invalid password");
    }

    public String register(UserDto userDto){

        User user = create(userDto);
        return jwtHelper.generateToken(new UserDetailsImp(user));
    }


    @Override
    public User convertForCreate(UserDto dto) {
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        return super.convertForCreate(dto);
    }
}
