package com.anonyep.qwa.web.controller;

import com.anonyep.qwa.model.*;
import com.anonyep.qwa.service.*;
import com.anonyep.qwa.web.dto.QuestionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/api/question")
public class QuestionController {


    private QuestionServiceImpl questionService;

    private QuizServiceImpl quizService;

    private TypeServiceImpl typeService;

    private AnswerServiceImpl answerService;

    @Autowired
    public QuestionController(QuestionServiceImpl questionService, QuizServiceImpl quizService, TypeServiceImpl typeService, AnswerServiceImpl answerService) {
        this.questionService = questionService;
        this.quizService = quizService;
        this.typeService = typeService;
        this.answerService = answerService;

    }

    @PostMapping("/add")
    //@PreAuthorize()
    @ResponseStatus(HttpStatus.CREATED)
    public Question save(@Valid @RequestBody QuestionDto questionDto) {
        Quiz quiz = this.quizService.find(Long.parseLong(questionDto.getQuizId()));
        System.out.println(questionDto.getType().getId());
        Type type = this.typeService.findById(questionDto.getType().getId());

        Question question = new Question();
        question.setQuiz(quiz);
        question.setType(type);
        question.setText(questionDto.getText());

        return this.questionService.save(question);
    }

    @DeleteMapping("/delete/{question_id}")
    //@PreAuthorize()
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long question_id) {
        Question question = this.questionService.findById(question_id);
        this.questionService.delete(question);
    }

    @GetMapping("/find/{question_id}")
    //@PreAuthorize()
    @ResponseStatus(HttpStatus.OK)
    public Question findById(@PathVariable Long question_id) {return this.questionService.findById(question_id);
    }

    @GetMapping("/type/{question_id}")
    //@PreAuthorize()
    @ResponseStatus(HttpStatus.OK)
    public Type findType(@PathVariable Long question_id) {
        return this.questionService.findById(question_id).getType();
    }

    @GetMapping("/allAnswers/{question_id}")
    //@PreAuthorize()
    @ResponseStatus(HttpStatus.OK)
    public List<Answer> allAnswers(@PathVariable Long question_id) {
        Question question = this.questionService.findById(question_id);
        return this.answerService.findAnswersByQuestion(question);
    }


    @GetMapping("/{question_id}/correctAnswer")
    //@PreAuthorize
    @ResponseStatus(HttpStatus.OK)
    public Answer getCorrectAnswer(@PathVariable Long question_id) {
        Question question = this.questionService.findById(question_id);
        return questionService.getCorrectAnswer(question);
    }

    @PostMapping("/{question_id}/correctAnswer")
    //@PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
    public void setCorrectAnswer(@PathVariable Long question_id, @RequestParam Long answer_id) {

        Question question = questionService.findById(question_id);
        Answer answer = answerService.findById(answer_id).get();
        questionService.setCorrectAnswer(question, answer);
    }

    @CrossOrigin
    @PostMapping("/checkResponseStandard/{question_id}")
    //@PreAuthorize()
    @ResponseStatus(HttpStatus.OK)
    public Boolean checkResponseStandard(@PathVariable Long question_id, @RequestBody List<Answer> response) {
        Question question = this.questionService.findById(question_id);

        return  this.questionService.checkResponseStandard(question, response);
    }

    @CrossOrigin
    @PostMapping("/checkResponseConnect/{question_id}")
    //@PreAuthorize()
    @ResponseStatus(HttpStatus.OK)
    public Boolean checkResponseConnect(@PathVariable Long question_id, @RequestBody List<AnswerConnect> response) {

        return this.questionService.checkResponseConnect(response);
    }

    @CrossOrigin
    @PostMapping("/checkResponseFill/{question_id}")
    //@PreAuthorize()
    @ResponseStatus(HttpStatus.OK)
    public Boolean checkResponseFill(@PathVariable Long question_id, @RequestBody Answer response) {

        return this.questionService.checkResponseFill(response);
    }

}
