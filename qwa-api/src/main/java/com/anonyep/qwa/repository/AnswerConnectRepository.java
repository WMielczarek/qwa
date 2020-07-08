package com.anonyep.qwa.repository;

import com.anonyep.qwa.model.AnswerConnect;
import com.anonyep.qwa.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerConnectRepository extends JpaRepository<AnswerConnect, Long> {
    List<AnswerConnect> findByQuestion(Question question);
}
