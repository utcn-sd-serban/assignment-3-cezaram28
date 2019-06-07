package com.cezaram28.Assignment1.service;

import com.cezaram28.Assignment1.dto.QuestionDTO;
import com.cezaram28.Assignment1.dto.UserDTO;
import com.cezaram28.Assignment1.entity.Question;
import com.cezaram28.Assignment1.entity.Tag;
import com.cezaram28.Assignment1.entity.User;
import com.cezaram28.Assignment1.event.QuestionCreatedEvent;
import com.cezaram28.Assignment1.event.QuestionDeletedEvent;
import com.cezaram28.Assignment1.event.QuestionUpdatedEvent;
import com.cezaram28.Assignment1.exception.NoAdminException;
import com.cezaram28.Assignment1.exception.QuestionNotFoundException;
import com.cezaram28.Assignment1.repository.QuestionRepository;
import com.cezaram28.Assignment1.repository.RepositoryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionManagementService {
    private final RepositoryFactory repositoryFactory;
    private final TagManagementService tagManagementService;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public List<QuestionDTO> listQuestions() {
        List<Question> questions = repositoryFactory.createQuestionRepository().findAll();
        if(questions.isEmpty()) return new ArrayList<>();
        questions.sort((q1,q2)->q2.getCreationDate().compareTo(q1.getCreationDate()));
        return questions.stream().map(QuestionDTO::ofEntity).collect(Collectors.toList());
    }

    @Transactional
    public List<QuestionDTO> listAllByUser(int userId) {
        Optional<List<Question>> questions = repositoryFactory.createQuestionRepository().findUsersAll(userId);
        if(!questions.isPresent()) throw new QuestionNotFoundException();
        questions.get().sort((q1,q2)->q2.getCreationDate().compareTo(q1.getCreationDate()));
        return questions.get().stream().map(QuestionDTO::ofEntity).collect(Collectors.toList());
    }

    @Transactional
    public QuestionDTO addQuestion(QuestionDTO questionDTO) {
        questionDTO.setCreationDate(new Timestamp(System.currentTimeMillis()));
        Question question = QuestionDTO.toEntity(questionDTO);
        tagManagementService.addTags(questionDTO.getTags());
        QuestionDTO output = QuestionDTO.ofEntity(repositoryFactory.createQuestionRepository().save(question));
        eventPublisher.publishEvent(new QuestionCreatedEvent(output));
        return output;
    }

    @Transactional
    public QuestionDTO editQuestion(QuestionDTO questionDTO, UserDTO userDTO) {

        if(!userDTO.getIsAdmin()) throw new NoAdminException();
        Question existingQuestion = repositoryFactory.createQuestionRepository().findById(questionDTO.getId()).orElseThrow(QuestionNotFoundException::new);
        existingQuestion.setText(questionDTO.getText());
        existingQuestion.setTitle(questionDTO.getTitle());
        existingQuestion.setVoteCount(questionDTO.getVoteCount());
        QuestionDTO output = QuestionDTO.ofEntity(repositoryFactory.createQuestionRepository().save(existingQuestion));
        eventPublisher.publishEvent(new QuestionUpdatedEvent(output));
        return output;
    }

    @Transactional
    public QuestionDTO changeScore(QuestionDTO questionDTO, int score){
        questionDTO.setVoteCount(score);
        QuestionDTO question = QuestionDTO.ofEntity(repositoryFactory.createQuestionRepository().save(QuestionDTO.toEntity(questionDTO)));
        eventPublisher.publishEvent(new QuestionUpdatedEvent(question));
        return question;
    }

    @Transactional
    public void removeQuestion(int id, UserDTO userDTO) {
        if(!userDTO.getIsAdmin()) throw new NoAdminException();
        QuestionRepository repository = repositoryFactory.createQuestionRepository();
        Question question = repository.findById(id).orElseThrow(QuestionNotFoundException::new);
        QuestionDTO output = QuestionDTO.ofEntity(question);
        eventPublisher.publishEvent(new QuestionDeletedEvent(output));
        repository.remove(question);
    }

    @Transactional
    public QuestionDTO findById(int id) {
        return QuestionDTO.ofEntity(repositoryFactory.createQuestionRepository()
                .findById(id).orElseThrow(QuestionNotFoundException::new));
    }

    @Transactional
    public List<QuestionDTO> getByTitle(String text) {
        final String text2 = text.trim();
        List<QuestionDTO> questions = listQuestions();
        questions = questions.stream().filter(question -> question.getTitle().contains(text2)).collect(Collectors.toList());
        if(questions.isEmpty()) throw new QuestionNotFoundException();
        return questions;
    }

    @Transactional
    public List<QuestionDTO> getByTag(String text) {
        List<QuestionDTO> questions = new ArrayList<>();
        List<QuestionDTO> qs = listQuestions();
        for(QuestionDTO q : qs){
            for(String t : q.getTags()){
                if(t.equals(text)){
                    questions.add(q);
                }
            }
        }
        if(questions.isEmpty()) throw new QuestionNotFoundException();
        return questions;
    }

}
