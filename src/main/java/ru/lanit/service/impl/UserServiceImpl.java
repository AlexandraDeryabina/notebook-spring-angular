package ru.lanit.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.lanit.dto.UserDto;
import ru.lanit.entity.UserEntity;
import ru.lanit.mapper.UserMapper;
import ru.lanit.repository.UserRepository;
import ru.lanit.service.UserService;

import java.util.ArrayList;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.getByLogin(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return new User(user.getLogin(), user.getPassword(), new ArrayList<>());
    }

    @Override
    public void createUserIfNeed(UserDto userDto) {
        boolean isNeed = !userRepository.getByLogin(userDto.getLogin()).isPresent();
        if (isNeed) {
            UserEntity user = userMapper.convert(userDto);
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            userRepository.saveAndFlush(user);
        }
    }
}
