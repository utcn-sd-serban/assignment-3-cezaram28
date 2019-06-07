package com.cezaram28.Assignment1.dto;

import com.cezaram28.Assignment1.entity.Vote;
import lombok.Data;
import lombok.RequiredArgsConstructor;

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

        if(vote.getQuestion() != null){
            voteDTO.setQuestion(QuestionDTO.ofEntity(vote.getQuestion()));
        } else {
            voteDTO.setQuestion(null);
        }

        if(vote.getAnswer() != null){
            voteDTO.setAnswer(AnswerDTO.ofEntity(vote.getAnswer()));
        } else {
            voteDTO.setAnswer(null);
        }

        voteDTO.setUser(UserDTO.ofEntity(vote.getUser()));
        return voteDTO;
    }

    public static Vote toEntity(VoteDTO voteDTO) {
        Vote vote = new Vote();
        vote.setId(voteDTO.getId());
        vote.setType(voteDTO.getType());

        if(voteDTO.getQuestion() != null){
            vote.setQuestion(QuestionDTO.toEntity(voteDTO.getQuestion()));
        } else {
            vote.setQuestion(null);
        }

        if(voteDTO.getAnswer() != null){
            vote.setAnswer(AnswerDTO.toEntity(voteDTO.getAnswer()));
        } else {
            vote.setAnswer(null);
        }

        vote.setUser(UserDTO.toEntity(voteDTO.getUser()));
        return vote;
    }
}
