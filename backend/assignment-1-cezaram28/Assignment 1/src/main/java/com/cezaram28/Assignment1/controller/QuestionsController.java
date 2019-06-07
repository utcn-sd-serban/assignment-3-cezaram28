package com.cezaram28.Assignment1.controller;

import com.cezaram28.Assignment1.dto.QuestionDTO;
import com.cezaram28.Assignment1.dto.UserDTO;
import com.cezaram28.Assignment1.event.BaseEvent;
import com.cezaram28.Assignment1.event.QuestionCreatedEvent;
import com.cezaram28.Assignment1.service.QuestionManagementService;
import com.cezaram28.Assignment1.service.UserManagementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class QuestionsController {
    private final QuestionManagementService questionService;
    private final UserManagementService userService;
    private final ApplicationEventPublisher eventPublisher;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/questions")
    public List<QuestionDTO> readAll() {
        List<QuestionDTO> dto = questionService.listQuestions();
        return dto;
    }

    @GetMapping("/questions/{id}")
    public QuestionDTO findById(@PathVariable int id) {
        return questionService.findById(id);
    }

    @GetMapping(value = "/questions/search", params = "tag")
    public List<QuestionDTO> getByTag(@RequestParam String tag) {
        return questionService.getByTag(tag);
    }

    @GetMapping(value = "/questions/search", params = "title")
    public List<QuestionDTO> getByTitle(@RequestParam String title) {
        return questionService.getByTitle(title);
    }

    @PostMapping("/questions")
    public QuestionDTO create(@RequestBody QuestionDTO dto) {
        QuestionDTO output = questionService.addQuestion(dto);
        return output;
    }

    @DeleteMapping("/questions/{id}")
    public void delete(@PathVariable int id, @RequestBody UserDTO userDTO) {
        questionService.removeQuestion(id, userDTO);
    }

    @PutMapping("/questions/{userId}")
    public QuestionDTO edit(@PathVariable int userId, @RequestBody QuestionDTO questionDTO) {
        UserDTO userDTO = userService.findById(userId);
        return questionService.editQuestion(questionDTO, userDTO);
    }

    @EventListener(BaseEvent.class)
    public void handleEvent(BaseEvent event){
        log.info("Got an event: {}.", event);
        messagingTemplate.convertAndSend("/topic/events", event);
    }
}
