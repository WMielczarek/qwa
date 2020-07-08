import { Injectable } from '@angular/core';
import {Question} from "../model/question";
import {Quiz} from "../model/quiz";
import {Answer} from "../model/answer";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quiz : Quiz;
  questionNumber : number = 0;
  progress : number;
  score = new Array<boolean>();

  constructor(private apiService : ApiService) {

  }

  checkResponseStandard(selectedAnswers) {
    this.apiService.responseStandard(this.quiz.questions[this.questionNumber].id, selectedAnswers).subscribe(
      res=> {
        this.score.push(res);
        this.questionNumber++;
      },
      err=> {
        alert("Coś poszło nie tak.");
      }
    )
  }

  checkResponseConnect(selectedAnswers) {
    this.apiService.responseConnect(this.quiz.questions[this.questionNumber].id, selectedAnswers).subscribe(
      res => {
        this.score.push(res);
        this.questionNumber++;
      },
      err => {
        alert("Coś poszło nie tak");
      }
    )
  }

  checkResponseFill(answerFill) {
    this.apiService.responseFill(this.quiz.questions[this.questionNumber].id, answerFill).subscribe(
      res => {
        this.score.push(res);
        this.questionNumber++;
      },
      err => {
        alert("Coś poszło nie tak");
      }
    )
  }

  numberOfCorrects() {
    let corrects = 0;
    for(let i = 0; i < this.score.length; i++) {
      if(this.score[i]) {
        corrects++;
      }
    }
    return corrects;
  }




}
