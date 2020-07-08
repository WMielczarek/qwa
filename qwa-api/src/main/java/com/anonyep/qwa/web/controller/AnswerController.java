package com.anonyep.qwa.web.controller;

import com.anonyep.qwa.model.Answer;
import com.anonyep.qwa.model.AnswerConnect;
import com.anonyep.qwa.model.Question;
import com.anonyep.qwa.service.AnswerServiceImpl;
import com.anonyep.qwa.service.QuestionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;


@CrossOrigin
@RequestMapping("/api/answer")
@RestController
public class AnswerController  {

    private AnswerServiceImpl answerService;

    private QuestionServiceImpl questionService;

    @Autowired
    public AnswerController(AnswerServiceImpl answerService, QuestionServiceImpl questionService) {
        this.answerService = answerService;
        this.questionService = questionService;
    }

    @PostMapping("/add/{question_id}")
   // @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.CREATED)
    public Answer save(@RequestBody Answer answer, @PathVariable Long question_id) {
        Question question = questionService.findById(question_id);
        return questionService.addAnswerToQuestion(question, answer);
    }

    @PostMapping("/add/connect/{question_id}")
    @ResponseStatus(HttpStatus.CREATED)
    public AnswerConnect saveConnect(@RequestBody AnswerConnect answerConnect, @PathVariable Long question_id) {
        Question question = questionService.findById(question_id);
        if(question.getType().getId()!=2) {
            throw new EntityExistsException("Wrong question type to add this answer");
        }
        return questionService.addConnectAnswerToQuestion(question, answerConnect);
    }


    @GetMapping("/{answer_id}")
    //@PreAuthorize("permitAll")
    @ResponseStatus(HttpStatus.OK)
    public Answer find(@PathVariable Long answer_id) {
        if(this.answerService.findById(answer_id).isPresent()) {
            return this.answerService.findById(answer_id).get();
        }
        throw new EntityNotFoundException("Could not find answer");
    }

    @PostMapping("/{answer_id}")
    //@PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
    public Answer update(@PathVariable Long answer_id, @RequestBody Answer answer) {
        answer.setId(answer_id);
        return answerService.update(answer);
    }

    @DeleteMapping("/{answer_id}")
    //@PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long answer_id) {
        if(this.answerService.findById(answer_id).isPresent()) {
            answerService.delete(this.answerService.findById(answer_id).get());
        }
        if(this.answerService.findByIdConnect(answer_id).isPresent()) {
            answerService.delete(this.answerService.findByIdConnect(answer_id).get());
        }
    }
}
