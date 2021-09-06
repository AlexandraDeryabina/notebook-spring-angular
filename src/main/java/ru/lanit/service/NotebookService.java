package ru.lanit.service;

import org.springframework.security.core.Authentication;
import ru.lanit.dto.NotebookDto;

import java.util.List;

public interface NotebookService {

    NotebookDto loadById(Long id, Authentication authentication);

    List<NotebookDto> load(Authentication authentication);

    NotebookDto save(NotebookDto notebookDto, Authentication authentication);

    void deleteById(Long id, Authentication authentication);
}
