package com.anonyep.qwa.web.controller;

import com.anonyep.qwa.model.Category;
import com.anonyep.qwa.model.Question;
import com.anonyep.qwa.model.Quiz;

import com.anonyep.qwa.model.User;
import com.anonyep.qwa.service.CategoryServiceImpl;
import com.anonyep.qwa.service.QuestionServiceImpl;
import com.anonyep.qwa.service.QuizServiceImpl;
import com.anonyep.qwa.service.UserServiceImpl;
import com.anonyep.qwa.web.dto.QuizForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/quiz")
public class QuizController {

    private QuizServiceImpl quizService;

    private CategoryServiceImpl categoryService;

    private UserServiceImpl userService;

    private QuestionServiceImpl questionService;

    @Autowired
    public QuizController(QuizServiceImpl quizService, CategoryServiceImpl categoryService, UserServiceImpl userService,
                          QuestionServiceImpl questionService) {
        this.quizService = quizService;
        this.categoryService = categoryService;
        this.userService = userService;
        this.questionService = questionService;
    }



    @PostMapping("/add")
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(HttpStatus.CREATED)
    public Quiz save(@Valid @RequestBody QuizForm newQuizForm, Principal principal) {

        Quiz newQuiz = new Quiz();
        newQuiz.setName(newQuizForm.getName());
        newQuiz.setText(newQuizForm.getText());
        newQuiz.setDifficultRate(Integer.parseInt(newQuizForm.getDifficultRate()));
        newQuiz.setRating(0.0);
        newQuiz.setSolvedTimes(0);
        newQuiz.setCategory(categoryService.findByName(newQuizForm.getCategory()));

        return quizService.save(newQuiz, userService.findByName(principal.getName()));
    }

    @DeleteMapping("/delete/{quiz_id}")
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long quiz_id) {
        Quiz quiz = quizService.find(quiz_id);
        quizService.delete(quiz);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<Quiz> findAll() {
        return quizService.findAll();
    }

    @GetMapping("/find/{quiz_id}")
    @ResponseStatus(HttpStatus.OK)
    public Quiz findById(@PathVariable Long quiz_id) {
        return quizService.find(quiz_id);
    }


    @PostMapping("/update/{quiz_id}")
    @ResponseStatus(HttpStatus.OK)
    //@PreAuthorize("hasRole('USER')")
    public Quiz updateQuiz(@PathVariable Long quiz_id,@RequestBody @Valid Quiz quiz) {
        quiz.setId(quiz_id);
        return this.quizService.update(quiz);
    }

    @GetMapping("/{quiz_id}/questions")
    //@PreAuthorize("permitAll")
    @ResponseStatus(HttpStatus.OK)
    public List<Question> findQuestions(@PathVariable Long quiz_id) {
        Quiz quiz = quizService.find(quiz_id);
        return this.questionService.findByQuiz(quiz);
    }

    @GetMapping("/find/category/{category_name}")
    @ResponseStatus(HttpStatus.OK)
    public List<Quiz> findQuizzesByCategory(@PathVariable String category_name) {
        return this.quizService.findQuizzesByCategory(category_name);
    }

    @GetMapping("/findAllForUser")
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(HttpStatus.OK)
    public List<Quiz> findQuizByUser(Principal principal) {
        User user = this.userService.findByName(principal.getName());
        return this.quizService.findQuizzesByUser(user);
    }

}
