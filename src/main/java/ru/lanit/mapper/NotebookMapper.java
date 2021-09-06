package ru.lanit.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.lanit.dto.NotebookDto;
import ru.lanit.entity.NotebookEntity;

@Mapper(componentModel = "spring")
public interface NotebookMapper {

    NotebookEntity convert(NotebookDto dto);

    @Mapping(target = "userId", source = "user.id")
    NotebookDto convert(NotebookEntity entity);

    default NotebookEntity update(NotebookEntity entity, NotebookDto dto) {
        if ( dto == null ) {
            return null;
        }

        entity.setId( dto.getId() );
        entity.setHeadline( dto.getHeadline() );
        entity.setText( dto.getText() );
        entity.setPriority( dto.getPriority() );
        entity.setDeadline( dto.getDeadline() );

        return entity;
    }
}
