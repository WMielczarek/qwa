package com.anonyep.qwa.repository;

import com.anonyep.qwa.model.Answer;
import com.anonyep.qwa.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findByQuestion(Question question);
}
