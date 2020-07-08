package com.anonyep.qwa.service;

import com.anonyep.qwa.model.Quiz;
import com.anonyep.qwa.model.User;
import com.anonyep.qwa.repository.CategoryRepository;
import com.anonyep.qwa.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class QuizServiceImpl {

    private QuizRepository quizRepository;
    private CategoryRepository categoryRepository;

    @Autowired
    public QuizServiceImpl(QuizRepository quizRepository, CategoryRepository categoryRepository) {
        this.quizRepository = quizRepository;
        this.categoryRepository = categoryRepository;
    }

    public Quiz save(Quiz quiz, User user) {
        quiz.setUser(user);
        return this.quizRepository.save(quiz);
    }

    public void delete(Quiz quiz) {
        quizRepository.delete(quiz);
    }

    public Quiz find(Long id) {
        return quizRepository.findById(id).get();
    }

    public List<Quiz> findAll() {
        return quizRepository.findAll();
    }

    public Quiz update(Quiz newQuiz) {
        Quiz oldQuiz = quizRepository.findById(newQuiz.getId()).get();

        mergeQuizzes(oldQuiz, newQuiz);
        return quizRepository.save(oldQuiz);
    }

    public List<Quiz> findQuizzesByUser(User user) {
        if(this.quizRepository.findByUser(user).isEmpty())
            throw new EntityNotFoundException("This user does not have any quizzes");

        return this.quizRepository.findByUser(user).get();
    }

    public List<Quiz> findQuizzesByCategory(String categoryName) {
        if(this.quizRepository.findByCategoryName(categoryName).isEmpty())
            throw new EntityNotFoundException("This category is empty");

        return this.quizRepository.findByCategoryName(categoryName).get();
    }

    private void mergeQuizzes(Quiz currentQuiz, Quiz newQuiz) {
        currentQuiz.setName(newQuiz.getName());
        currentQuiz.setText(newQuiz.getText());
        currentQuiz.setSolvedTimes(newQuiz.getSolvedTimes());
        currentQuiz.setRating(newQuiz.getRating());
        currentQuiz.setDifficultRate(newQuiz.getDifficultRate());
        currentQuiz.setCategory(newQuiz.getCategory());
    }


}

