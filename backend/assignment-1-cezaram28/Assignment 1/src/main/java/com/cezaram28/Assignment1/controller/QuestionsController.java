package com.cezaram28.Assignment1.controller;

import com.cezaram28.Assignment1.dto.QuestionDTO;
import com.cezaram28.Assignment1.service.QuestionManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class QuestionsController {
    private final QuestionManagementService questionService;

    @GetMapping("/questions")
    public List<QuestionDTO> readAll() {
        List<QuestionDTO> dto = questionService.listQuestions();
        System.out.println(dto);
        return dto;
    }

    @GetMapping("/questions/{id}")
    public QuestionDTO findById(@PathVariable int id) {
        return questionService.findById(id);
    }

    @GetMapping("/questions/{tag}")
    public List<QuestionDTO> getByTag(@PathVariable String tag) {
        return questionService.getByTag(tag);
    }

    @GetMapping("/questions/{title}")
    public List<QuestionDTO> getByTitle(@PathVariable String title) {
        return questionService.getByTitle(title);
    }

    @PostMapping("/questions")
    public QuestionDTO create(@RequestBody QuestionDTO dto){
        return questionService.addQuestion(dto);
    }
}
