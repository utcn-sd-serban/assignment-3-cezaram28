package com.cezaram28.Assignment1.service;

import com.cezaram28.Assignment1.dto.AnswerDTO;
import com.cezaram28.Assignment1.dto.UserDTO;
import com.cezaram28.Assignment1.entity.Answer;
import com.cezaram28.Assignment1.entity.Question;
import com.cezaram28.Assignment1.entity.User;
import com.cezaram28.Assignment1.event.AnswerCreatedEvent;
import com.cezaram28.Assignment1.event.AnswerDeletedEvent;
import com.cezaram28.Assignment1.event.AnswerUpdatedEvent;
import com.cezaram28.Assignment1.exception.AnswerNotFoundException;
import com.cezaram28.Assignment1.exception.NoAdminException;
import com.cezaram28.Assignment1.repository.AnswerRepository;
import com.cezaram28.Assignment1.repository.RepositoryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnswerManagementService {
    private final RepositoryFactory repositoryFactory;
    private final ApplicationEventPublisher eventPublisher;

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
    public AnswerDTO addAnswer(AnswerDTO answerDTO) {
        answerDTO.setCreationDate(new Timestamp(System.currentTimeMillis()));
        Answer answer = AnswerDTO.toEntity(answerDTO);
        AnswerDTO output = AnswerDTO.ofEntity(repositoryFactory.createAnswerRepository().save(answer));
        eventPublisher.publishEvent(new AnswerCreatedEvent(output));
        return output;
    }

    @Transactional
    public AnswerDTO editAnswer(AnswerDTO answerDTO, UserDTO userDTO) {
        Answer answer = repositoryFactory.createAnswerRepository().findById(answerDTO.getId()).orElseThrow(AnswerNotFoundException::new);
        answer.setText(answerDTO.getText());
        answer.setVoteCount(answerDTO.getVoteCount());
        if(userDTO.getIsAdmin()||userDTO.getId()==answer.getAuthor().getId()) {
            AnswerDTO output = AnswerDTO.ofEntity(repositoryFactory.createAnswerRepository().save(answer));
            eventPublisher.publishEvent(new AnswerUpdatedEvent(output));
            return output;
        }
        else throw new NoAdminException();
    }

    @Transactional
    public AnswerDTO changeScore(AnswerDTO answerDTO, int score){
        answerDTO.setVoteCount(score);
        AnswerDTO answer = AnswerDTO.ofEntity(repositoryFactory.createAnswerRepository().save(AnswerDTO.toEntity(answerDTO)));
        eventPublisher.publishEvent(new AnswerUpdatedEvent(answer));
        return answer;
    }

    @Transactional
    public void removeAnswer(int id, UserDTO userDTO) {
        AnswerRepository repository = repositoryFactory.createAnswerRepository();
        Answer answer = repository.findById(id).orElseThrow(AnswerNotFoundException::new);
        if(userDTO.getIsAdmin()||userDTO.getId()==answer.getAuthor().getId()){
            eventPublisher.publishEvent(new AnswerDeletedEvent(AnswerDTO.ofEntity(answer)));
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
