package com.anonyep.qwa.service;

import com.anonyep.qwa.model.Answer;
import com.anonyep.qwa.model.AnswerConnect;
import com.anonyep.qwa.model.Question;
import com.anonyep.qwa.model.Quiz;
import com.anonyep.qwa.repository.AnswerConnectRepository;
import com.anonyep.qwa.repository.AnswerRepository;
import com.anonyep.qwa.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionServiceImpl {

    private QuestionRepository questionRepository;
    private AnswerRepository answerRepository;
    private AnswerConnectRepository answerConnectRepository;

    @Autowired
    public QuestionServiceImpl(QuestionRepository questionRepository, AnswerRepository answerRepository, AnswerConnectRepository answerConnectRepository) {
        this.answerConnectRepository = answerConnectRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }


    public Question save(Question question) {
        return this.questionRepository.save(question);
    }

    public void delete(Question question){
        this.questionRepository.delete(question);
    }

    public List<Question> findByQuiz(Quiz quiz) {
        if(this.questionRepository.findAllByQuiz(quiz).isEmpty())
            throw new EntityNotFoundException("Could not find questions for this quiz");

       return this.questionRepository.findAllByQuiz(quiz).get();
    }

    public Question findById(Long id){
        if(this.questionRepository.findById(id).isEmpty())
            throw new EntityNotFoundException("Question with this id doesnt not exist");

        return this.questionRepository.findById(id).get();
    }

    public Answer getCorrectAnswer(Question question) {
        for (Answer answer: question.getAnswers()){
            if(answer.getCorrect())
                return answer;
        }
        throw  new EntityNotFoundException("Could not find correct answer for this question");
    }

    public void setCorrectAnswer(Question question, Answer answer) {
        this.getCorrectAnswer(question).setCorrect(false);
        answer.setQuestion(question);
        answer.setCorrect(true);
        this.answerRepository.save(answer);

    }

    public Answer addAnswerToQuestion(Question question, Answer answer) {
        List<Answer> answers = question.getAnswers();
        answers.add(answer);
        question.setAnswers(answers);
        answer.setQuestion(question);

        return this.answerRepository.save(answer);
    }

    public AnswerConnect addConnectAnswerToQuestion(Question question, AnswerConnect answerConnect) {
        List<AnswerConnect> answerConnects = question.getAnswersConnect();

        answerConnects.add(answerConnect);
        question.setAnswersConnect(answerConnects);
        answerConnect.setQuestion(question);

        return this.answerConnectRepository.save(answerConnect);
    }

    private List<Answer> getAllCorrectAnswers(Question question) {
        List<Answer> correctAnswers = new ArrayList<Answer>();
        for (Answer answer: question.getAnswers()){
            if(answer.getCorrect())
                correctAnswers.add(answer);
        }
        return correctAnswers;
    }

    public Boolean checkResponseStandard(Question question, List<Answer> response) {

        if(this.getAllCorrectAnswers(question).size() != response.size())
            return false;

        for (Answer answer : response) {
            if(!this.answerRepository.findById(answer.getId()).get().getCorrect()){
                return false;
            }
        }
        return true;
    }

    public Boolean checkResponseConnect(List<AnswerConnect> response) {


        for (AnswerConnect answerConnect : response) {
            AnswerConnect answerDB = this.answerConnectRepository.findById(answerConnect.getId()).get();
            if(!answerDB.getLeftText().equals(answerConnect.getLeftText()) || !answerDB.getRightText().equals(answerConnect.getRightText())){
                return false;
            }
        }
        return true;
    }

    public Boolean checkResponseFill(Answer response) {
        Answer correctAnswer = this.answerRepository.findById(response.getId()).get();

        if(response.getText().equalsIgnoreCase(correctAnswer.getText())) {
            return true;
        }

        return false;
    }


}
