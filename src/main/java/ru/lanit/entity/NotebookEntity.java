package ru.lanit.entity;

import lombok.Getter;
import lombok.Setter;
import ru.lanit.enums.NotePriority;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "NOTEBOOK")
public class NotebookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "HEADLINE")
    private String headline;

    @Column(name = "TEXT")
    private String text;

    @Column(name = "PRIORITY")
    private NotePriority priority;

    @Column(name = "DEADLINE")
    private LocalDateTime deadline;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private UserEntity user;
}
