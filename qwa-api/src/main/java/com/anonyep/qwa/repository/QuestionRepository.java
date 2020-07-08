package com.anonyep.qwa.repository;

import com.anonyep.qwa.model.Question;
import com.anonyep.qwa.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<List<Question>> findAllByQuiz(Quiz quiz);
}
