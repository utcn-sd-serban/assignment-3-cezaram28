package com.cezaram28.Assignment1.service;

import com.cezaram28.Assignment1.dto.QuestionDTO;
import com.cezaram28.Assignment1.dto.UserDTO;
import com.cezaram28.Assignment1.entity.Question;
import com.cezaram28.Assignment1.entity.Tag;
import com.cezaram28.Assignment1.entity.User;
import com.cezaram28.Assignment1.exception.NoAdminException;
import com.cezaram28.Assignment1.exception.QuestionNotFoundException;
import com.cezaram28.Assignment1.repository.QuestionRepository;
import com.cezaram28.Assignment1.repository.RepositoryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionManagementService {
    private final RepositoryFactory repositoryFactory;

    @Transactional
    public List<QuestionDTO> listQuestions() {
        List<Question> questions = repositoryFactory.createQuestionRepository().findAll();
        if(questions.isEmpty()) throw new QuestionNotFoundException();
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
        Question question = QuestionDTO.toEntity(questionDTO);
        return QuestionDTO.ofEntity(repositoryFactory.createQuestionRepository().save(question));
    }

    @Transactional
    public QuestionDTO editQuestion(Question question, User user) {
        if(!user.getIsAdmin()) throw new NoAdminException();
        return QuestionDTO.ofEntity(repositoryFactory.createQuestionRepository().save(question));
    }

    @Transactional
    public void removeQuestion(int id, User user) {
        if(!user.getIsAdmin()) throw new NoAdminException();
        QuestionRepository repository = repositoryFactory.createQuestionRepository();
        Question question = repository.findById(id).orElseThrow(QuestionNotFoundException::new);
        repository.remove(question);
    }

    @Transactional
    public QuestionDTO findById(int id) {
        return QuestionDTO.ofEntity(repositoryFactory.createQuestionRepository()
                .findById(id).orElseThrow(QuestionNotFoundException::new));
    }

    @Transactional
    public List<QuestionDTO> getByTitle(String text) {
        List<QuestionDTO> questions = listQuestions();
        questions = questions.stream().filter(question -> question.getTitle().contains(text)).collect(Collectors.toList());
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
