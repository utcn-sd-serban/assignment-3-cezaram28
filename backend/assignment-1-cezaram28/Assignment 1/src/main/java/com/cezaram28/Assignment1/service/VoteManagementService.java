package com.cezaram28.Assignment1.service;

import com.cezaram28.Assignment1.dto.AnswerDTO;
import com.cezaram28.Assignment1.dto.QuestionDTO;
import com.cezaram28.Assignment1.dto.UserDTO;
import com.cezaram28.Assignment1.dto.VoteDTO;
import com.cezaram28.Assignment1.entity.User;
import com.cezaram28.Assignment1.entity.Vote;
import com.cezaram28.Assignment1.event.QuestionUpdatedEvent;
import com.cezaram28.Assignment1.event.UserUpdatedEvent;
import com.cezaram28.Assignment1.exception.*;
import com.cezaram28.Assignment1.repository.RepositoryFactory;
import com.cezaram28.Assignment1.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VoteManagementService {
    private final RepositoryFactory repositoryFactory;
    private final QuestionManagementService questionManagementService;
    private final UserManagementService userManagementService;
    private final AnswerManagementService answerManagementService;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public VoteDTO save(VoteDTO vote) {
        return VoteDTO.ofEntity(repositoryFactory.createVoteRepository().save(VoteDTO.toEntity(vote)));
    }

    @Transactional
    public void remove(int id) {
        VoteRepository repository = repositoryFactory.createVoteRepository();
        Vote vote = repository.findById(id).orElseThrow(VoteNotFoundException::new);
        repository.remove(vote);
    }

    @Transactional
    public VoteDTO findByQuestion(int questionId, int userId) {
        return VoteDTO.ofEntity(repositoryFactory.createVoteRepository()
                .findByQuestion(questionId, userId).orElseThrow(VoteNotFoundException::new));
    }

    @Transactional
    public VoteDTO findByAnswer(int answerId, int userId) {
        return VoteDTO.ofEntity(repositoryFactory.createVoteRepository()
                .findByAnswer(answerId, userId).orElseThrow(VoteNotFoundException::new));
    }

    @Transactional
    public void upvoteQuestion(QuestionDTO question, UserDTO user) {
        if (question.getAuthor().getId() == user.getId()) {
            throw new YourPostException();
        } else {
            VoteDTO vote = new VoteDTO();
            vote.setUser(user);
            vote.setQuestion(question);
            vote.setType("up");

            try {
                VoteDTO v = findByQuestion(question.getId(), user.getId());
                if (v.getType().equals(vote.getType())) {
                    throw new UpvotedException();
                } else {
                    // compute score by modifying parameters +7 question author, +2 question
                    v.setType("up");
                    save(v);

                    questionManagementService.changeScore(question, question.getVoteCount() + 2);

                    question.getAuthor().setScore(question.getAuthor().getScore() + 7);

                    User u = repositoryFactory.createUserRepository().findById(question.getAuthor().getId()).orElseThrow(UserNotFoundException::new);
                    u.setScore(question.getAuthor().getScore());
                    repositoryFactory.createUserRepository().save(u);
                    eventPublisher.publishEvent(new UserUpdatedEvent(question.getAuthor()));
                }
            } catch (VoteNotFoundException e) {
                vote.setType("up");
                save(vote);

                questionManagementService.changeScore(question, question.getVoteCount() + 1);

                question.getAuthor().setScore(question.getAuthor().getScore() + 5);
                User u = repositoryFactory.createUserRepository().findById(question.getAuthor().getId()).orElseThrow(UserNotFoundException::new);
                u.setScore(question.getAuthor().getScore());
                repositoryFactory.createUserRepository().save(u);
                eventPublisher.publishEvent(new UserUpdatedEvent(question.getAuthor()));
            }
        }
    }

    @Transactional
    public void downvoteQuestion(QuestionDTO question, UserDTO user) {
        if (question.getAuthor().getId() == user.getId()) {
            throw new YourPostException();
        } else {
            VoteDTO vote = new VoteDTO();
            vote.setType("down");
            vote.setQuestion(question);
            vote.setUser(user);
            try {
                VoteDTO v = findByQuestion(question.getId(), user.getId());
                if (v.getType().equals(vote.getType())) {
                    throw new DownvotedException();
                } else {
                    // compute score by modifying parameters -7 question author, -2 question
                    v.setType("down");
                    save(v);

                    questionManagementService.changeScore(question, question.getVoteCount() - 2);

                    question.getAuthor().setScore(question.getAuthor().getScore() - 7);
                    User u = repositoryFactory.createUserRepository().findById(question.getAuthor().getId()).orElseThrow(UserNotFoundException::new);
                    u.setScore(question.getAuthor().getScore());
                    repositoryFactory.createUserRepository().save(u);
                    eventPublisher.publishEvent(new UserUpdatedEvent(question.getAuthor()));
                }
            } catch (VoteNotFoundException e) {
                vote.setType("down");
                save(vote);

                questionManagementService.changeScore(question, question.getVoteCount() - 1);
                question.getAuthor().setScore(question.getAuthor().getScore() - 2);
                User u = repositoryFactory.createUserRepository().findById(question.getAuthor().getId()).orElseThrow(UserNotFoundException::new);
                u.setScore(question.getAuthor().getScore());

                repositoryFactory.createUserRepository().save(u);
                eventPublisher.publishEvent(new UserUpdatedEvent(question.getAuthor()));
            }
        }
    }

    @Transactional
    public void upvoteAnswer(AnswerDTO answer, UserDTO user) {
        if (answer.getAuthor().getId() == user.getId()) {
            throw new YourPostException();
        } else {
            VoteDTO vote = new VoteDTO();
            vote.setType("up");
            vote.setAnswer(answer);
            vote.setUser(user);
            try {
                VoteDTO v = findByAnswer(answer.getId(), user.getId());
                if (v.getType().equals(vote.getType())) {
                    throw new UpvotedException();
                } else {
                    // compute score by modifying parameters +12 answer author, +1 user, +2 answer
                    v.setType("up");
                    save(v);

                    answerManagementService.changeScore(answer, answer.getVoteCount() + 2);

                    answer.getAuthor().setScore(answer.getAuthor().getScore() + 12);
                    User u = repositoryFactory.createUserRepository().findById(answer.getAuthor().getId()).orElseThrow(UserNotFoundException::new);
                    u.setScore(answer.getAuthor().getScore());

                    repositoryFactory.createUserRepository().save(UserDTO.toEntity(answer.getAuthor()));
                    eventPublisher.publishEvent(new UserUpdatedEvent(answer.getAuthor()));

                    user.setScore(user.getScore() + 1);
                    u = repositoryFactory.createUserRepository().findById(user.getId()).orElseThrow(UserNotFoundException::new);
                    u.setScore(user.getScore());
                    repositoryFactory.createUserRepository().save(u);
                    eventPublisher.publishEvent(new UserUpdatedEvent(user));
                }
            } catch (VoteNotFoundException e) {
                vote.setType("up");
                save(vote);

                answerManagementService.changeScore(answer, answer.getVoteCount() + 1);

                answer.getAuthor().setScore(answer.getAuthor().getScore() + 10);
                User u = repositoryFactory.createUserRepository().findById(answer.getAuthor().getId()).orElseThrow(UserNotFoundException::new);
                u.setScore(answer.getAuthor().getScore());
                repositoryFactory.createUserRepository().save(u);
                eventPublisher.publishEvent(new UserUpdatedEvent(answer.getAuthor()));
            }
        }
    }

    @Transactional
    public void downvoteAnswer(AnswerDTO answer, UserDTO user) {
        if (answer.getAuthor().getId() == user.getId()) {
            throw new YourPostException();
        } else {
            VoteDTO vote = new VoteDTO();
            vote.setType("down");
            vote.setAnswer(answer);
            vote.setUser(user);
            try {
                VoteDTO v = findByAnswer(answer.getId(), user.getId());
                if (v.getType().equals(vote.getType())) {
                    throw new DownvotedException();
                } else {
                    // compute score by modifying parameters -12 answer author, -1 user, -2 answer
                    v.setType("down");
                    save(v);

                    answerManagementService.changeScore(answer, answer.getVoteCount() - 2);

                    answer.getAuthor().setScore(answer.getAuthor().getScore() - 12);
                    User u = repositoryFactory.createUserRepository().findById(answer.getAuthor().getId()).orElseThrow(UserNotFoundException::new);
                    u.setScore(answer.getAuthor().getScore());
                    repositoryFactory.createUserRepository().save(u);
                    eventPublisher.publishEvent(new UserUpdatedEvent(answer.getAuthor()));

                    user.setScore(user.getScore() - 1);
                    u = repositoryFactory.createUserRepository().findById(user.getId()).orElseThrow(UserNotFoundException::new);
                    u.setScore(user.getScore());
                    repositoryFactory.createUserRepository().save(u);
                    eventPublisher.publishEvent(new UserUpdatedEvent(user));
                }
            } catch (VoteNotFoundException e) {
                vote.setType("down");
                save(vote);

                answerManagementService.changeScore(answer, answer.getVoteCount() - 1);

                answer.getAuthor().setScore(answer.getAuthor().getScore() - 2);
                User u = repositoryFactory.createUserRepository().findById(answer.getAuthor().getId()).orElseThrow(UserNotFoundException::new);
                u.setScore(answer.getAuthor().getScore());
                repositoryFactory.createUserRepository().save(u);
                eventPublisher.publishEvent(new UserUpdatedEvent(answer.getAuthor()));

                user.setScore(user.getScore() - 1);
                u = repositoryFactory.createUserRepository().findById(user.getId()).orElseThrow(UserNotFoundException::new);
                u.setScore(user.getScore());
                repositoryFactory.createUserRepository().save(u);
                eventPublisher.publishEvent(new UserUpdatedEvent(user));
            }
        }
    }
}
