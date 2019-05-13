package com.cezaram28.Assignment1.dto;

import com.cezaram28.Assignment1.entity.Vote;
import lombok.Data;

@Data
public class VoteDTO {
    private Integer id;
    private String type;
    private QuestionDTO question;
    private AnswerDTO answer;
    private UserDTO user;

    public static VoteDTO ofEntity(Vote vote) {
        VoteDTO voteDTO = new VoteDTO();
        voteDTO.setId(vote.getId());
        voteDTO.setType(vote.getType());
        voteDTO.setQuestion(QuestionDTO.ofEntity(vote.getQuestion()));
        voteDTO.setAnswer(AnswerDTO.ofEntity(vote.getAnswer()));
        voteDTO.setUser(UserDTO.ofEntity(vote.getUser()));
        return voteDTO;
    }

    public static Vote toEntity(VoteDTO voteDTO) {
        Vote vote = new Vote();
        vote.setId(voteDTO.getId());
        vote.setType(voteDTO.getType());
        vote.setQuestion(QuestionDTO.toEntity(voteDTO.getQuestion()));
        vote.setAnswer(AnswerDTO.toEntity(voteDTO.getAnswer()));
        vote.setUser(UserDTO.toEntity(voteDTO.getUser()));
        return vote;
    }
}
