package com.cezaram28.Assignment1.controller;

import com.cezaram28.Assignment1.dto.AnswerDTO;
import com.cezaram28.Assignment1.dto.UserDTO;
import com.cezaram28.Assignment1.service.AnswerManagementService;
import com.cezaram28.Assignment1.service.QuestionManagementService;
import com.cezaram28.Assignment1.service.UserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AnswersController {
    private final AnswerManagementService answerService;
    private final QuestionManagementService questionManagementService;
    private final UserManagementService userManagementService;

    @GetMapping("questions/{id}/answers")
    public List<AnswerDTO> getByQuestion(@PathVariable int id) {
        List<AnswerDTO> dto = answerService.listAllToQuestion(id);
        return dto;
    }

    @PostMapping("/answers")
    public AnswerDTO addAnswer(@RequestBody AnswerDTO answerDTO) {
        return answerService.addAnswer(answerDTO);
    }

    @DeleteMapping("/answers/{id}")
    public void delete(@PathVariable int id, @RequestBody UserDTO userDTO) {
        answerService.removeAnswer(id, userDTO);
    }

    @PutMapping("/answers/{userId}")
    public AnswerDTO editAnswer(@PathVariable int userId, @RequestBody AnswerDTO answerDTO) {
        UserDTO userDTO = userManagementService.findById(userId);
        return answerService.editAnswer(answerDTO, userDTO);
    }
}
