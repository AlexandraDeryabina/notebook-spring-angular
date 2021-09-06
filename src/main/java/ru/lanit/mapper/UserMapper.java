package ru.lanit.mapper;

import org.mapstruct.Mapper;
import ru.lanit.dto.UserDto;
import ru.lanit.entity.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserEntity convert(UserDto dto);

    UserDto convert(UserEntity entity);
}
