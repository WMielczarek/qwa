import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../service/api.service";
import {Question} from "../../../model/question";
import {Answer} from "../../../model/answer";

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit {

  private sub : any;
  private questionId;
  private question: Question;


  constructor(
    private apiService : ApiService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {
    this.sub  = this.route.params.subscribe(params=> {
      this.questionId = params["questionId"];
      this.apiService.getQuestionById(this.questionId).subscribe(
        res => {
          this.question = res;
        },
        err=> alert("Coś poszło nie tak"),
      );
    });
  }

  editAnswer() {

  }

  updateAnswer(answer : Answer) {
    if(answer.id) {
      this.apiService.updateAnswer(answer, answer.id).subscribe(
        res=> {
          console.log("Update");
        },
        err=> {
          alert("Operacja się nie powiodła");
        }
      )
    }
    else{
      this.apiService.addNewAnswer(answer, this.question.id).subscribe(
        res=> {
          console.log(this.question.answers);
          let answerSaved : any = this.question.answers.pop();
          answerSaved = res;
          this.question.answers.push(answerSaved);
        },
        err=> {
          alert("Operacja się nie udała");
        }

      )
    }
  }

  removeAnswer(answer: Answer, index: number) {
    this.apiService.removeAnswer(answer.id).subscribe(
      res=> {
        console.log(this.question.answers);
        this.question.answers.splice(index, 1);
        console.log(this.question.answers);
        alert("Udalo się");
      },
      err=> {
        alert("Cos poszlo nie tak");
      }
    )
  }

  addAnswer() {
    let answerToSave : Answer = {
        id: null,
        text: "",
        correct: false,
        questionId: null
    };

    this.question.answers.push(answerToSave);
  }

  removeQuestion() {
    this.apiService.removeQuestion(this.question.id).subscribe(
      res => {
        this.router.navigate(['/quizView', this.question.quizId])
      },
      err => {
        alert("Coś poszło nie tak");
      }
    )
  }





}
