package ru.lanit.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.lanit.converters.LocalDateTimeDeserializer;
import ru.lanit.converters.LocalDateTimeSerializer;
import ru.lanit.enums.NotePriority;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotebookDto {
    private Long id;

    private String headline;

    private String text;

    private NotePriority priority;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime deadline;

    private String userId;
}
