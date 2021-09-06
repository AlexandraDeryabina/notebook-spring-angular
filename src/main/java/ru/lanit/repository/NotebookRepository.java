package ru.lanit.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.lanit.entity.NotebookEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotebookRepository extends JpaRepository<NotebookEntity, Long> {
    List<NotebookEntity> findAllByUser_Login(String userLogin);
    Optional<NotebookEntity> findByIdAndUser_Login(Long id, String userLogin);
}
