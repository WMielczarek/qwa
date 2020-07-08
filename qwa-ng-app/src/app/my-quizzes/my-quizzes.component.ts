import { Component, OnInit } from '@angular/core';
import {ApiService} from "../service/api.service";
import {window} from "rxjs/operators";

@Component({
  selector: 'app-my-quizzes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.css']
})
export class MyQuizzesComponent implements OnInit {

  quizzes;

  constructor(private apiService : ApiService) { }

  ngOnInit() {
    this.getQuizzesForUser();
  }

  getQuizzesForUser() {
    this.apiService.getFindQuizzesByUser().subscribe(
      res => this.quizzes = res,
      err => alert("Something went wrong")
    )
  }

  deleteQuiz(quizId) {
    console.log("usuniete");
    this.apiService.removeQuiz(quizId).subscribe(
      res => alert("Usunieto quiz"),
            err => alert("Coś poszło nie tak")
    )

  }

  editQuiz(quizId) {
    console.log("edycja quizu");
  }

  displayQuiz(quizId) {
    console.log("wyswietl quiz");
  }
}
