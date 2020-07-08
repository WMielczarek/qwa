import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from "./service/auth.service";
import {TokenStorageService} from "./service/token-storage.service";
import {TokenInterceptorService} from "./service/token-interceptor.service";
import {ApiService} from "./service/api.service";
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category/category.component';
import { QuizComponent } from './quiz-add/quiz.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatCheckboxModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatListModule,
  MatProgressBarModule, MatIconModule
} from '@angular/material';
import {QuizzesComponent} from "./quizzes/quizzes.component";
import {QuestionComponent} from "./quiz-add/question/question.component";
import {QuestionTypeComponent} from "./quiz-add/question-type/question-type.component";
import {AnswerComponent} from "./quiz-add/question/answer/answer.component";
import { QuizPlayComponent } from './quiz-play/quiz-play.component';
import { MyQuizzesComponent } from './my-quizzes/my-quizzes.component';
import { QuizViewComponent } from './my-quizzes/quiz-view/quiz-view.component';
import { QuestionViewComponent } from './my-quizzes/quiz-view/question-view/question-view.component';
import { AdminComponent } from './admin/admin.component';
import { QuizSolveComponent } from './quiz-play/quiz-solve/quiz-solve.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ResultComponent } from './quiz-play/result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    CategoriesComponent,
    CategoryComponent,
    QuizComponent,
    QuestionComponent,
    QuizzesComponent,
    QuestionTypeComponent,
    AnswerComponent,
    QuizPlayComponent,
    MyQuizzesComponent,
    QuizViewComponent,
    QuestionViewComponent,
    AdminComponent,
    QuizSolveComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    DragDropModule,
    MatProgressBarModule,
    MatIconModule,
  ],
  exports: [
    MatDialogModule
  ],
  providers: [AuthService, ApiService, TokenStorageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [
    QuestionTypeComponent,
    AnswerComponent
  ]
})
export class AppModule { }
