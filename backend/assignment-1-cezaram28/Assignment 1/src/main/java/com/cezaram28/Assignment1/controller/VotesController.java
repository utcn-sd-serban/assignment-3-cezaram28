package com.cezaram28.Assignment1.controller;

import com.cezaram28.Assignment1.dto.AnswerDTO;
import com.cezaram28.Assignment1.dto.QuestionDTO;
import com.cezaram28.Assignment1.dto.UserDTO;
import com.cezaram28.Assignment1.service.UserManagementService;
import com.cezaram28.Assignment1.service.VoteManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class VotesController {
    private final VoteManagementService voteService;
    private final UserManagementService userService;

    @PostMapping("/votes/question/upvote/{userId}")
    public void upvoteQuestion(@RequestBody QuestionDTO dto, @PathVariable int userId) {
        System.out.println(dto);
        UserDTO user = userService.findById(userId);
        voteService.upvoteQuestion(dto, user);
    }

    @PostMapping("/votes/question/downvote/{userId}")
    public void downvoteQuestion(@RequestBody QuestionDTO dto, @PathVariable int userId) {
        UserDTO user = userService.findById(userId);
        voteService.downvoteQuestion(dto, user);
    }

    @PostMapping("/votes/answer/upvote/{userId}")
    public void upvoteAnswer(@RequestBody AnswerDTO dto, @PathVariable int userId) {
        UserDTO user = userService.findById(userId);
        voteService.upvoteAnswer(dto, user);
    }

    @PostMapping("/votes/answer/downvote/{userId}")
    public void downvoteAnswer(@RequestBody AnswerDTO dto, @PathVariable int userId) {
        UserDTO user = userService.findById(userId);
        voteService.downvoteAnswer(dto, user);
    }

}
