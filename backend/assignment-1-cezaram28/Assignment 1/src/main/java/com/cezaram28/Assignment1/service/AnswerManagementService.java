package com.cezaram28.Assignment1.service;

import com.cezaram28.Assignment1.dto.AnswerDTO;
import com.cezaram28.Assignment1.entity.Answer;
import com.cezaram28.Assignment1.entity.Question;
import com.cezaram28.Assignment1.entity.User;
import com.cezaram28.Assignment1.exception.AnswerNotFoundException;
import com.cezaram28.Assignment1.exception.NoAdminException;
import com.cezaram28.Assignment1.repository.AnswerRepository;
import com.cezaram28.Assignment1.repository.RepositoryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnswerManagementService {
    private final RepositoryFactory repositoryFactory;

    @Transactional
    public List<AnswerDTO> listAnswers() {
        List<Answer> answers = repositoryFactory.createAnswerRepository().findAll();
        if(answers.isEmpty()) throw new AnswerNotFoundException();
        answers.sort((a2, a1) -> a1.getVoteCount().compareTo(a2.getVoteCount()));
        return answers.stream().map(AnswerDTO::ofEntity).collect(Collectors.toList());
    }

    @Transactional
    public List<AnswerDTO> listAllToQuestion(int questionId) {
        Optional<List<Answer>> answers = repositoryFactory.createAnswerRepository().findQuestionsAll(questionId);
        if(!answers.isPresent()) throw new AnswerNotFoundException();
        answers.get().sort((a2, a1) -> a1.getVoteCount().compareTo(a2.getVoteCount()));
        return answers.get().stream().map(AnswerDTO::ofEntity).collect(Collectors.toList());
    }

    @Transactional
    public List<AnswerDTO> listAllByUser(int userId) {
        Optional<List<Answer>> answers = repositoryFactory.createAnswerRepository().findUsersAll(userId);
        if(!answers.isPresent()) throw new AnswerNotFoundException();
        answers.get().sort((a2, a1) -> a1.getVoteCount().compareTo(a2.getVoteCount()));
        return answers.get().stream().map(AnswerDTO::ofEntity).collect(Collectors.toList());
    }

    @Transactional
    public AnswerDTO addAnswer(Answer answer) {
        return AnswerDTO.ofEntity(repositoryFactory.createAnswerRepository().save(answer));
    }

    @Transactional
    public AnswerDTO editAnswer(Answer answer, User user) {
        if(user.getIsAdmin()||user.getId()==answer.getAuthor().getId())
            return AnswerDTO.ofEntity(repositoryFactory.createAnswerRepository().save(answer));
        else throw new NoAdminException();
    }

    @Transactional
    public void removeAnswer(int id, User user) {
        AnswerRepository repository = repositoryFactory.createAnswerRepository();
        Answer answer = repository.findById(id).orElseThrow(AnswerNotFoundException::new);
        if(user.getIsAdmin()||user.getId()==answer.getAuthor().getId()){
            repository.remove(answer);
        }
        else throw new NoAdminException();
    }

    @Transactional
    public AnswerDTO findById(int id) {
        return AnswerDTO.ofEntity(repositoryFactory.createAnswerRepository()
                .findById(id).orElseThrow(AnswerNotFoundException::new));
    }
}
