package ru.lanit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.lanit.dto.NotebookDto;
import ru.lanit.service.NotebookService;

import java.util.List;

@Scope("session")
@RestController
@RequestMapping("/notebook")
public class NotebookController {

    @Autowired
    private NotebookService notebookService;

    @GetMapping(value = "/load/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<NotebookDto> loadById(@PathVariable Long id, Authentication authentication) {
        return ResponseEntity.ok(notebookService.loadById(id, authentication));
    }

    @GetMapping(value = "/load", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<NotebookDto>> load(Authentication authentication) {
        return ResponseEntity.ok(notebookService.load(authentication));
    }

    @PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<NotebookDto> save(@RequestBody NotebookDto notebookDto, Authentication authentication) {
        return ResponseEntity.ok(notebookService.save(notebookDto, authentication));
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity save(@PathVariable Long id, Authentication authentication) {
        notebookService.deleteById(id, authentication);
        return ResponseEntity.ok().build();
    }
}
