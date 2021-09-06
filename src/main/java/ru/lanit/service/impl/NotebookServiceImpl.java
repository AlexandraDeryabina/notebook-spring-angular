package ru.lanit.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.lanit.dto.NotebookDto;
import ru.lanit.entity.NotebookEntity;
import ru.lanit.exception.NotFoundException;
import ru.lanit.mapper.NotebookMapper;
import ru.lanit.repository.NotebookRepository;
import ru.lanit.repository.UserRepository;
import ru.lanit.service.NotebookService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotebookServiceImpl implements NotebookService {

    @Autowired
    protected NotebookRepository notebookRepository;

    @Autowired
    protected UserRepository userRepository;

    @Autowired
    protected NotebookMapper notebookMapper;

    @Override
    @Transactional(readOnly = true)
    public NotebookDto loadById(Long id, Authentication authentication) {
        NotebookEntity notebookEntity = notebookRepository.findByIdAndUser_Login(id, authentication.getName())
                .orElseThrow(NotFoundException::new);
        return notebookMapper.convert(notebookEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotebookDto> load(Authentication authentication) {
        return notebookRepository.findAllByUser_Login(authentication.getName()).stream()
                .map(notebookEntity -> notebookMapper.convert(notebookEntity)).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public NotebookDto save(NotebookDto notebookDto, Authentication authentication) {
        NotebookEntity notebookEntity = notebookDto.getId() == null ?
                new NotebookEntity() :
                notebookRepository.findById(notebookDto.getId()).orElseThrow(NotFoundException::new);
        notebookMapper.update(notebookEntity, notebookDto);
        notebookEntity.setUser(userRepository.getByLogin(authentication.getName()).orElseThrow(NotFoundException::new));
        return notebookMapper.convert(notebookRepository.save(notebookEntity));
    }

    @Override
    @Transactional
    public void deleteById(Long id, Authentication authentication) {
        NotebookEntity notebookEntity = notebookRepository.findByIdAndUser_Login(id, authentication.getName())
                .orElseThrow(NotFoundException::new);
        notebookRepository.delete(notebookEntity);
    }
}
