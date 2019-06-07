package com.cezaram28.Assignment1.dto;

import com.cezaram28.Assignment1.entity.Question;
import com.cezaram28.Assignment1.entity.Tag;
import lombok.Data;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class QuestionDTO {
    private Integer id;
    private String title;
    private UserDTO author;
    private String text;
    private Timestamp creationDate;
    private Integer voteCount;
    private List<String> tags;

    public static QuestionDTO ofEntity(Question question){
        QuestionDTO questionDTO = new QuestionDTO();
        questionDTO.setId(question.getId());
        questionDTO.setTitle(question.getTitle());
        questionDTO.setAuthor(UserDTO.ofEntity(question.getAuthor()));
        questionDTO.setText(question.getText());
        questionDTO.setCreationDate(question.getCreationDate());
        questionDTO.setVoteCount(question.getVoteCount());
        if(question.getTags().isEmpty()) questionDTO.setTags(new ArrayList<String>());
        else
        questionDTO.setTags(question.getTags().stream().map(Tag::getName).collect(Collectors.toList()));
        return questionDTO;
    }

    public static Question toEntity(QuestionDTO questionDTO){
        Question question = new Question();
        question.setId(questionDTO.getId());
        question.setTitle(questionDTO.getTitle());
        question.setAuthor(UserDTO.toEntity(questionDTO.getAuthor()));
        question.setText(questionDTO.getText());
        question.setCreationDate(questionDTO.getCreationDate());
        question.setVoteCount(questionDTO.getVoteCount());
        List<Tag> tags = new ArrayList<>();
        for(String t : questionDTO.getTags()){
            Tag tag = new Tag(null, t);
            tags.add(tag);
        }
        question.setTags(tags);
        return question;
    }
}
