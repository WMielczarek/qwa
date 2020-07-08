import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../service/api.service";
import {Category} from "../model/category";
import {ActivatedRoute, Router} from "@angular/router";
import {Quiz} from "../model/quiz";

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {

  quizCategory: string;
  private sub: any;

  quizzes;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
  ) {}

  ngOnInit() {

    this.sub  = this.route.params.subscribe(params=> {
      this.quizCategory = params["name"];
    });
    this.getAllQuizzes();

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getAllQuizzes() {
    this.apiService.getAllQuizzesForCategory(this.quizCategory).subscribe(
      res=> {
        this.quizzes = res;
      },
      err=> {
        alert("Failedd")
      }
    );
  }


}
