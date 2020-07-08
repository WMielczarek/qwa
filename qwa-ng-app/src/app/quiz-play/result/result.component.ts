import { Component, OnInit } from '@angular/core';
import {QuizService} from "../../service/quiz.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(
    private quizService : QuizService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  next() {
    this.quizService.quiz = null;
    this.quizService.questionNumber = 0;
    this.quizService.score = new Array();
    this.quizService.progress = 0;
    this.router.navigate(["/categories"])
  }
}
