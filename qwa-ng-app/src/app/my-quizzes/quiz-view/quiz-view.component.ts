import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {Quiz} from "../../model/quiz";

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.css']
})
export class QuizViewComponent implements OnInit {

  private quizId : number;
  private quiz : Quiz;
  private sub : any;
  private quizName : string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.sub  = this.route.params.subscribe(params=> {
      this.quizId = params["quizId"];
      this.apiService.getQuizById(this.quizId).subscribe(
        res => {
          this.quiz = res;
          console.log(this.quiz);
        },
              err=> alert("Coś poszło nie tak"),
      );
    });
  }





}
