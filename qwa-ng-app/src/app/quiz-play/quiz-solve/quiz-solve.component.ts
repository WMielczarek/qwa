import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {QuizService} from "../../service/quiz.service";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Question} from "../../model/question";
import {AnswerConnect} from "../../model/answer-connect";
import {Answer} from "../../model/answer";

@Component({
  selector: 'app-quiz-solve',
  templateUrl: './quiz-solve.component.html',
  styleUrls: ['./quiz-solve.component.css']
})
export class QuizSolveComponent implements OnInit {

  private selectedAnswers;
  private questionNumber : number;
  private question : Question;
  private numberOfQuestions;
  private numberOfCorrects : number;

  private connectsLeft = new Array();
  private connectsRight = new Array();
  private selectedConnectAnswers = new Array();
  private answerFillText : string;

  private endOfQuiz : boolean = false;




  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private quizService: QuizService) {

  }

  ngOnInit() {
    this.numberOfQuestions = this.quizService.quiz.questions.length;
    console.log("inicjalizacja");
    if(this.quizService.quiz.questions.length <= this.quizService.questionNumber) {
      this.endOfQuiz = true;
      this.router.navigate(["/result"]);
    }
    this.questionNumber = this.quizService.questionNumber;
    this.question = this.quizService.quiz.questions[this.quizService.questionNumber];
    console.log(this.quizService.quiz);
    console.log(this.questionNumber);
    console.log(this.question);
    if(this.question.type.id === 2) {
      console.log("CONNECT question");
      this.forConnectQuestion();
    }


    console.log(this.quizService.score);
  }

  onNgModelChange(event){
    console.log(this.selectedAnswers);
  }

  dropLeftSide(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.connectsLeft, event.previousIndex, event.currentIndex);
  }

  dropRightSide(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.connectsRight, event.previousIndex, event.currentIndex);
  }

  confirm() {
    console.log(this.quizService.questionNumber);
    console.log(this.quizService.quiz.questions.length);
    this.quizService.checkResponseStandard(this.selectedAnswers);
    if(this.quizService.quiz.questions.length <= this.quizService.questionNumber+1) {
      this.router.navigate(['/result']);
      this.endOfQuiz = true;
    }
  }

  confirmConnect() {
    let index = 0;
    for(let answerLeft of this.connectsLeft) {
      let selectedConnectAnswer : AnswerConnect  = {
        id: answerLeft.id,
        leftText: answerLeft.text,
        rightText: this.connectsRight[index].text,
        questionId: this.question.id
      };
      this.selectedConnectAnswers.push(selectedConnectAnswer);
      index++;
    }
    console.log(this.quizService.questionNumber);
    console.log(this.quizService.quiz.questions.length);
    this.quizService.checkResponseConnect(this.selectedConnectAnswers);
    if(this.quizService.quiz.questions.length <= this.quizService.questionNumber+1) {
      this.router.navigate(['/result']);
      this.endOfQuiz = true;
    }

  }

  confirmFill() {
    let answerFill : Answer = {
      id: this.quizService.quiz.questions[this.quizService.questionNumber].answers[0].id,
      text: this.answerFillText,
      correct: true,
      questionId: this.quizService.quiz.questions[this.quizService.questionNumber].id
    };
    console.log(this.quizService.questionNumber);
    console.log(this.quizService.quiz.questions.length);

    this.quizService.checkResponseFill(answerFill);
    if(this.quizService.quiz.questions.length <= this.quizService.questionNumber+1) {
      this.router.navigate(['/result']);
      this.endOfQuiz = true;
      }
    }


  forConnectQuestion() {
    for(let answerConnect of this.question.answersConnect) {
      let connectAnswerLeft = {
        id: answerConnect.id,
        text: answerConnect.leftText
      };
      let connectAnswerRight = {
        id: answerConnect.id,
        text: answerConnect.rightText
      };
      this.connectsLeft.push(connectAnswerLeft);
      this.connectsRight.push(connectAnswerRight);
    }
  }
}
