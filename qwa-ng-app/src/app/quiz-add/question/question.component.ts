import {
  Component,
  ComponentFactoryResolver, ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {Question} from "../../model/question";
import {AnswerComponent} from "./answer/answer.component";
import {Type} from "../../model/type";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {Answer} from "../../model/answer";
import {AnswerConnect} from "../../model/answer-connect";

export interface questionInterface {
  remove(index: number);

}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @ViewChild('answerContainerRef', { read: ViewContainerRef }) VCR: ViewContainerRef;
  indexAnswer: number = 0;

  componentsReferences = [];

  selfRef: QuestionComponent;
  index: number;
  typeId: string;
  quizId: string;
  //interface for Parent-Child interaction
  public compInteraction: questionInterface;



  question : Question = new class implements Question {
    id: number;
    quizId: string;
    text: string;
    type: Type = {
      id: -2,
      name: ""
    };
    answers: Answer[];
    answersConnect: AnswerConnect[];
  };

  addedQuestion;
  questionSaved=false;

  constructor(private apiService:ApiService, private CFR: ComponentFactoryResolver) { }

  ngOnInit() {

  }

  saveQuestion() {
    if(this.typeId === '1') {
      this.question.type.name = "STANDART";
    }
    if(this.typeId === '3') {
      this.question.text = this.fillQuestion(this.question.text);
      this.question.type.name = "FILL";
    }
    if(this.typeId === '2') {
      this.question.type.name = "CONNECT";
    }

    this.question.quizId = this.quizId;
    this.question.type.id = +this.typeId;
    this.apiService.addNewQuestion(this.question).subscribe(
      res=> {
        this.addedQuestion = res;
        this.questionSaved=true;
        this.addAnswerComponent();
      },
      err=> {
        alert("Nie udalo sie dodac pytania")
      }

    )

  }

  private fillQuestion(text: string) : string{
    if(text.includes("#")){
      return text.replace("#", "_____");
    }
    else {
      alert("Pytanie nie zawiera znacznika #");
    }
  }

  addAnswerComponent() {

    let componentFactory = this.CFR.resolveComponentFactory(AnswerComponent);
    let componentRef: ComponentRef<AnswerComponent> = this.VCR.createComponent(componentFactory);
    let currentComponent = componentRef.instance;

    currentComponent.selfRef = currentComponent;
    currentComponent.index = ++this.indexAnswer;
    currentComponent.questionTypeId=this.typeId;
    currentComponent.questionId=this.addedQuestion.id;

    // prividing parent Component reference to get access to parent class methods
    currentComponent.compInteraction = this;

    // add reference for newly created component
    this.componentsReferences.push(componentRef);
  }

  remove(index: number) {

    if (this.VCR.length < 1)
      return;

    let componentRef = this.componentsReferences.filter(x => x.instance.index == index)[0];
    let component: AnswerComponent = <AnswerComponent>componentRef.instance;

    let vcrIndex: number = this.VCR.indexOf(componentRef)

    // removing component from container
    this.VCR.remove(vcrIndex);

    this.componentsReferences = this.componentsReferences.filter(x => x.instance.index !== index);
  }


  removeQuestion() {

    this.apiService.removeQuestion(this.addedQuestion.id).subscribe(
      res=> {
        alert("Usunięto pytanie");
      },
      err=> {
        alert("Cos poszlo nie tak");
      }
    );
    this.compInteraction.remove(this.index)
  }



}
