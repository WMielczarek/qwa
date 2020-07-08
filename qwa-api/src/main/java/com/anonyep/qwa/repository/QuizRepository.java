package com.anonyep.qwa.repository;

import com.anonyep.qwa.model.Category;
import com.anonyep.qwa.model.Quiz;
import com.anonyep.qwa.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Optional<Quiz> findQuizByName(String quizName);
    Optional<List<Quiz>> findByUser(User user);
    Optional<List<Quiz>> findByCategoryName(String category);

}
