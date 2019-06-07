package com.cezaram28.Assignment1.seed;

import com.cezaram28.Assignment1.entity.Question;
import com.cezaram28.Assignment1.entity.Tag;
import com.cezaram28.Assignment1.entity.User;
import com.cezaram28.Assignment1.repository.QuestionRepository;
import com.cezaram28.Assignment1.repository.RepositoryFactory;
import com.cezaram28.Assignment1.repository.TagRepository;
import com.cezaram28.Assignment1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE)
@ConditionalOnProperty(name = "a1.repository-type", havingValue = "MEMORY")
public class Seed implements CommandLineRunner {

    private final RepositoryFactory repositoryFactory;
    private final PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private TagRepository tagRepository;
    private QuestionRepository questionRepository;
    private int count = 0;

    @Override
    public void run(String... args){
        userRepository = repositoryFactory.createUserRepository();
        tagRepository = repositoryFactory.createTagRepository();
        questionRepository = repositoryFactory.createQuestionRepository();

        if (userRepository.findAll().isEmpty()) {
            userRepository.save(new User(null, "user1", passwordEncoder.encode("pass1"), "email1", 0, true, false));
            userRepository.save(new User(null, "user2", passwordEncoder.encode("pass2"), "email2", 0, false, false));
            userRepository.save(new User(null, "ws", passwordEncoder.encode("ws"), "email2", 0, false, false));
            //userRepository.save(new User(null, "user3", passwordEncoder.encode("pass3"), "email3", 0, true, true));
            //userRepository.save(new User(null, "user1", "pass1", "email1", 0, true, false));
            //userRepository.save(new User(null, "user2", "pass2", "email2", 0, false, false));
        }


        tagRepository.save(new Tag(null, "java"));


        if (questionRepository.findAll().isEmpty()) {
            questionRepository.save(new Question(null, "question1", userRepository.findById(3*count+1).get(), "text1", new Timestamp(System.currentTimeMillis()), 0, tagRepository.findAll()));
            questionRepository.save(new Question(null, "question2", userRepository.findById(3*count+1).get(), "text2", new Timestamp(System.currentTimeMillis()), 0, new ArrayList<>()));
            //questionRepository.save(new Question(null, "question3", userRepository.findById(2).get(), "text3", new Timestamp(System.currentTimeMillis()), 0, null));
        }
    }

    @Transactional
    public void clear() {
        userRepository.deleteAll();
        questionRepository.deleteAll();
        tagRepository.deleteAll();
        count++;
    }
}
