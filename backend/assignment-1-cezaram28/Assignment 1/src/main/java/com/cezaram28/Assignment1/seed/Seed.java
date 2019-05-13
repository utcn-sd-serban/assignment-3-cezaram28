package com.cezaram28.Assignment1.seed;

import com.cezaram28.Assignment1.entity.Question;
import com.cezaram28.Assignment1.entity.User;
import com.cezaram28.Assignment1.repository.QuestionRepository;
import com.cezaram28.Assignment1.repository.RepositoryFactory;
import com.cezaram28.Assignment1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE)
@ConditionalOnProperty(name = "a1.repository-type", havingValue = "MEMORY")
public class Seed implements CommandLineRunner {

    private final RepositoryFactory repositoryFactory;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        UserRepository userRepository = repositoryFactory.createUserRepository();
        if (userRepository.findAll().isEmpty()) {
            userRepository.save(new User(null, "user1", passwordEncoder.encode("pass1"), "email1", 0, true, false));
            userRepository.save(new User(null, "user2", passwordEncoder.encode("pass2"), "email2", 0, false, false));
            userRepository.save(new User(null, "user3", passwordEncoder.encode("pass3"), "email3", 0, true, true));
        }

        QuestionRepository questionRepository = repositoryFactory.createQuestionRepository();
        if (questionRepository.findAll().isEmpty()) {
            questionRepository.save(new Question(null, "question1", userRepository.findById(1).get(), "text1", new Timestamp(System.currentTimeMillis()), 0, null));
            questionRepository.save(new Question(null, "question2", userRepository.findById(1).get(), "text2", new Timestamp(System.currentTimeMillis()), 0, null));
            questionRepository.save(new Question(null, "question3", userRepository.findById(2).get(), "text3", new Timestamp(System.currentTimeMillis()), 0, null));
        }
    }
}
