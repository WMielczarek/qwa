import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../service/api.service";
import {QuizService} from "../service/quiz.service";

@Component({
  selector: 'app-quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.css']
})
export class QuizPlayComponent implements OnInit {

  private sub : any;
  private quizId : number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private quizService: QuizService) {

  }

  ngOnInit() {
    this.sub  = this.route.params.subscribe(params=> {
      this.quizId = params["quizId"];
      this.apiService.getQuizById(this.quizId).subscribe(
        res => {
          this.quizService.quiz = res;
        },
        err=> alert("Coś poszło nie tak"),
      );
    });
  }

}
