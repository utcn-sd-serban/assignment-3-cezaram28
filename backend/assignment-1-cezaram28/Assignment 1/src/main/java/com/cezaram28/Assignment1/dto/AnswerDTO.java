package com.cezaram28.Assignment1.dto;

import com.cezaram28.Assignment1.entity.Answer;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class AnswerDTO {
    private Integer id;
    private QuestionDTO question;
    private UserDTO author;
    private String text;
    private Timestamp creationDate;
    private Integer voteCount;

    public static AnswerDTO ofEntity(Answer answer) {
        AnswerDTO answerDTO = new AnswerDTO();
        answerDTO.setId(answer.getId());
        answerDTO.setQuestion(QuestionDTO.ofEntity(answer.getQuestion()));
        answerDTO.setAuthor(UserDTO.ofEntity(answer.getAuthor()));
        answerDTO.setText(answer.getText());
        answerDTO.setCreationDate(answer.getCreationDate());
        answerDTO.setVoteCount(answer.getVoteCount());
        return answerDTO;
    }

    public static Answer toEntity(AnswerDTO answerDTO) {
        Answer answer = new Answer();
        answer.setId(answerDTO.getId());
        answer.setQuestion(QuestionDTO.toEntity(answerDTO.getQuestion()));
        answer.setAuthor(UserDTO.toEntity(answerDTO.getAuthor()));
        answer.setText(answerDTO.getText());
        answer.setCreationDate(answerDTO.getCreationDate());
        answer.setVoteCount(answerDTO.getVoteCount());
        return answer;
    }
}
