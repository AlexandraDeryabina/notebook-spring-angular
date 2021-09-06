package ru.lanit.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.lanit.dto.UserDto;

public interface UserService extends UserDetailsService {
    void createUserIfNeed(UserDto userDto);
}
