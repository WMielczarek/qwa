import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer} from "../../../model/answer";
import {ApiService} from "../../../service/api.service";
import {Question} from "../../../model/question";
import {ConnectAnswerModel} from "../../../model/connect-answer-model";
import {questionInterface} from "../question.component";

export interface answerInterface {
  remove(index: number);

}

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {


  index: number;
  questionTypeId: string;
  questionId: number;
  selfRef: AnswerComponent;
  //interface for Parent-Child interaction
  public compInteraction: answerInterface;

  answerToSave: Answer = {
    id: null,
    text: "",
    correct: false,
    questionId: null
  };

  connectAnswerToSave = {
    id: null,
    leftText: "",
    rightText: ""
  };


  answerSaved: boolean = false;
  savedAnswer;


  constructor(private apiService : ApiService) { }

  ngOnInit() {
  }

  saveConnectAnswer() {
    this.apiService.addNewConnectAnswer(this.connectAnswerToSave, this.questionId).subscribe(
      res=> {
        this.savedAnswer = res;
        this.answerSaved = true;
      },
      err =>{
        alert("Coś poszło nie tak");
      }
    )

  }

  saveAnswer() {

    this.apiService.addNewAnswer(this.answerToSave, this.questionId).subscribe(
      res=>{
          this.savedAnswer = res;
          this.answerSaved = true;
      },
      err=> {
          alert("Coś poszło nie tak");
      }
    );
  }

  saveFillAnswer() {
    if (this.answerToSave.text.includes(" ")) {
      alert("Odpowiedz składać się może tylko z jednego słowa")
    }
    else {
      this.apiService.addNewAnswer(this.answerToSave, this.questionId).subscribe(
        res => {
          this.savedAnswer = res;
          this.answerSaved = true;
        },
        err => {
          alert("Coś poszło nie tak");
        }
      );
   }
  }

  removeAnswer() {

  }


}
