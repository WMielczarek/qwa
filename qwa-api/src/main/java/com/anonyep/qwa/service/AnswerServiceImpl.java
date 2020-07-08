package com.anonyep.qwa.service;

import com.anonyep.qwa.model.Answer;
import com.anonyep.qwa.model.AnswerConnect;
import com.anonyep.qwa.model.Question;
import com.anonyep.qwa.repository.AnswerConnectRepository;
import com.anonyep.qwa.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class AnswerServiceImpl {

    private AnswerRepository answerRepository;
    private AnswerConnectRepository answerConnectRepository;

    private QuestionServiceImpl questionService;

    @Autowired
    public AnswerServiceImpl(AnswerRepository answerRepository, AnswerConnectRepository answerConnectRepository) {
        this.answerRepository = answerRepository;
        this.answerConnectRepository = answerConnectRepository;
    }

    public List<Answer> findAnswersByQuestion(Question question) {
        return this.answerRepository.findByQuestion(question);
    }

    public Optional<Answer> findById(Long answerId) {
        return this.answerRepository.findById(answerId);
    }

    public Optional<AnswerConnect> findByIdConnect(Long answerId) {
        return this.answerConnectRepository.findById(answerId);
    }

    public void delete(Answer answer) {
        this.answerRepository.delete(answer);
    }

    public void delete(AnswerConnect answerConnect) {
        this.answerConnectRepository.delete(answerConnect);
    }

    public Answer update(Answer newAnswer)  {
        Answer currentAnswer = findById(newAnswer.getId()).get();
        currentAnswer.setText(newAnswer.getText());
        currentAnswer.setCorrect(newAnswer.getCorrect());

        return answerRepository.save(currentAnswer);
    }


}
