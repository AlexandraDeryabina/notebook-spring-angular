package ru.lanit.enums;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public enum NotePriority {

    LOW("Низкая срочность"),
    NORMAL("Средняя срочность"),
    HIGH("Высокая срочность");

    private final String description;
}
