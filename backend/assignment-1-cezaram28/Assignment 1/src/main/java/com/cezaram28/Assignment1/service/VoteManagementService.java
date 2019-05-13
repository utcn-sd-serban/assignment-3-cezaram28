package com.cezaram28.Assignment1.service;

import com.cezaram28.Assignment1.dto.QuestionDTO;
import com.cezaram28.Assignment1.dto.UserDTO;
import com.cezaram28.Assignment1.dto.VoteDTO;
import com.cezaram28.Assignment1.entity.Answer;
import com.cezaram28.Assignment1.entity.Question;
import com.cezaram28.Assignment1.entity.User;
import com.cezaram28.Assignment1.entity.Vote;
import com.cezaram28.Assignment1.exception.*;
import com.cezaram28.Assignment1.repository.RepositoryFactory;
import com.cezaram28.Assignment1.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VoteManagementService {
    private final RepositoryFactory repositoryFactory;
    private final QuestionManagementService questionManagementService;
    private final UserManagementService userManagementService;
    private final AnswerManagementService answerManagementService;

    @Transactional
    public VoteDTO save(Vote vote) {
        return VoteDTO.ofEntity(repositoryFactory.createVoteRepository().save(vote));
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
    /*
    @Transactional
    public void upvoteQuestion(QuestionDTO question, UserDTO user) {
        if (question.getAuthor().getId() == user.getId()) {
            throw new YourPostException();
        } else {
            Vote vote = new Vote(null, "up", QuestionDTO.toEntity(question), null, user);
            try {
                Vote v = findByQuestion(question.getId(), user.getId());
                if (v.getType().equals(vote.getType())) {
                    throw new UpvotedException();
                } else {
                    // compute score by modifying parameters +7 question author, +2 question
                    v.setType("up");
                    save(v);

                    question.setVoteCount(question.getVoteCount() + 2);
                    questionManagementService.addQuestion(question);

                    question.getAuthor().setScore(question.getAuthor().getScore() + 7);
                    userManagementService.addUser(question.getAuthor());
                }
            } catch (VoteNotFoundException e) {
                vote.setType("up");
                save(vote);

                question.setVoteCount(question.getVoteCount() + 1);
                questionManagementService.addQuestion(question);

                question.getAuthor().setScore(question.getAuthor().getScore() + 5);
                userManagementService.addUser(question.getAuthor());
            }
        }
    }

    @Transactional
    public void downvoteQuestion(Question question, User user) {
        if (question.getAuthor().getId() == user.getId()) {
            throw new YourPostException();
        } else {
            Vote vote = new Vote(null, "down", question, null, user);
            try {
                Vote v = findByQuestion(question.getId(), user.getId());
                if (v.getType().equals(vote.getType())) {
                    throw new DownvotedException();
                } else {
                    // compute score by modifying parameters -7 question author, -2 question
                    v.setType("down");
                    save(v);

                    question.setVoteCount(question.getVoteCount() - 2);
                    questionManagementService.addQuestion(question);

                    question.getAuthor().setScore(question.getAuthor().getScore() - 7);
                    userManagementService.addUser(question.getAuthor());
                }
            } catch (VoteNotFoundException e) {
                vote.setType("down");
                save(vote);

                question.setVoteCount(question.getVoteCount() - 1);
                questionManagementService.addQuestion(question);

                question.getAuthor().setScore(question.getAuthor().getScore() - 2);
                userManagementService.addUser(question.getAuthor());
            }
        }
    }

    @Transactional
    public void upvoteAnswer(Answer answer, User user) {
        if (answer.getAuthor().getId() == user.getId()) {
            throw new YourPostException();
        } else {
            Vote vote = new Vote(null, "up", null, answer, user);
            try {
                Vote v = findByAnswer(answer.getId(), user.getId());
                if (v.getType().equals(vote.getType())) {
                    throw new UpvotedException();
                } else {
                    // compute score by modifying parameters +12 answer author, +1 user, +2 answer
                    v.setType("up");
                    save(v);

                    answer.setVoteCount(answer.getVoteCount() + 2);
                    answerManagementService.addAnswer(answer);

                    answer.getAuthor().setScore(answer.getAuthor().getScore() + 12);
                    userManagementService.addUser(answer.getAuthor());

                    user.setScore(user.getScore() + 1);
                    userManagementService.addUser(user);
                }
            } catch (VoteNotFoundException e) {
                vote.setType("up");
                save(vote);

                answer.setVoteCount(answer.getVoteCount() + 1);
                answerManagementService.addAnswer(answer);

                answer.getAuthor().setScore(answer.getAuthor().getScore() + 10);
                userManagementService.addUser(answer.getAuthor());
            }
        }
    }

    @Transactional
    public void downvoteAnswer(Answer answer, User user) {
        if (answer.getAuthor().getId() == user.getId()) {
            throw new YourPostException();
        } else {
            Vote vote = new Vote(null, "down", null, answer, user);
            try {
                Vote v = findByAnswer(answer.getId(), user.getId());
                if (v.getType().equals(vote.getType())) {
                    throw new DownvotedException();
                } else {
                    // compute score by modifying parameters -12 answer author, -1 user, -2 answer
                    v.setType("down");
                    save(v);

                    answer.setVoteCount(answer.getVoteCount() - 2);
                    answerManagementService.addAnswer(answer);

                    answer.getAuthor().setScore(answer.getAuthor().getScore() - 12);
                    userManagementService.addUser(answer.getAuthor());

                    user.setScore(user.getScore() - 1);
                    userManagementService.addUser(user);
                }
            } catch (VoteNotFoundException e) {
                vote.setType("down");
                save(vote);

                answer.setVoteCount(answer.getVoteCount() - 1);
                answerManagementService.addAnswer(answer);

                answer.getAuthor().setScore(answer.getAuthor().getScore() - 2);
                userManagementService.addUser(answer.getAuthor());

                user.setScore(user.getScore() - 1);
                userManagementService.addUser(user);
            }
        }
    }*/
}
