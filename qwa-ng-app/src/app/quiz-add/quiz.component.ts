import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Category} from "../model/category";
import {ApiService} from "../service/api.service";
import {Quiz} from "../model/quiz";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {QuestionComponent} from "./question/question.component";
import {QuestionTypeComponent} from "./question-type/question-type.component";
import {Question} from "../model/question";



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @ViewChild('questionContainerRef', { read: ViewContainerRef }) VCR: ViewContainerRef;

  index: number = 0;
  componentsReferences = [];
  categories;
  quizCreated=false;
  addedQuiz;
  questionTypeId;

  quiz: Quiz = new class implements Quiz {
    category: Category;
    difficultRate: number;
    id: string;
    name: string;
    rating: number;
    solvedTimes: string;
    text: string;
    questions: Question[];
  };


  constructor(private apiService: ApiService, private CFR: ComponentFactoryResolver,
  private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories(){
    this.apiService.getAllCategories().subscribe(
      res => {
        this.categories = res;
      },
      err => {alert("Error occurred while downloading the categories;")}
    );
  }

  addNewQuiz(){
    this.apiService.addNewQuiz(this.quiz).subscribe(
      res=> {
        this.addedQuiz=res;
        this.quizCreated=true;
      },
      err=> {
        alert("Could not add quiz");
      }
    );

  }

  addQuestionComponent() {

    const ref = this.dialog.open(QuestionTypeComponent);
    const sub = ref.componentInstance.choice.subscribe((data) => {
      this.questionTypeId=(data);
      let componentFactory = this.CFR.resolveComponentFactory(QuestionComponent);
      let componentRef: ComponentRef<QuestionComponent> = this.VCR.createComponent(componentFactory);
      let currentComponent = componentRef.instance;

      currentComponent.selfRef = currentComponent;
      currentComponent.quizId = this.addedQuiz.id;
      currentComponent.index = ++this.index;
      console.log(this.questionTypeId);
      currentComponent.typeId = this.questionTypeId;

      // prividing parent Component reference to get access to parent class methods
      currentComponent.compInteraction = this;

      // add reference for newly created component
      this.componentsReferences.push(componentRef);
    });

    ref.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  remove(index: number) {
    if (this.VCR.length < 1)
      return;
    let componentRef = this.componentsReferences.filter(x => x.instance.index == index)[0];
    let component: QuestionComponent = <QuestionComponent>componentRef.instance;
    let vcrIndex: number = this.VCR.indexOf(componentRef)
    // removing component from container
    this.VCR.remove(vcrIndex);
    this.componentsReferences = this.componentsReferences.filter(x => x.instance.index !== index);
  }



}
