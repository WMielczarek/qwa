import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from "./login/login.component";
import { SignupComponent} from "./signup/signup.component";
import {CategoriesComponent} from "./categories/categories.component";
import {QuizComponent} from "./quiz-add/quiz.component";
import {QuestionComponent} from "./quiz-add/question/question.component";
import {QuizzesComponent} from "./quizzes/quizzes.component";
import {MyQuizzesComponent} from "./my-quizzes/my-quizzes.component";
import {QuizViewComponent} from "./my-quizzes/quiz-view/quiz-view.component";
import {QuestionViewComponent} from "./my-quizzes/quiz-view/question-view/question-view.component";
import {QuizPlayComponent} from "./quiz-play/quiz-play.component";
import {QuizSolveComponent} from "./quiz-play/quiz-solve/quiz-solve.component";
import {AdminComponent} from "./admin/admin.component";
import {ResultComponent} from "./quiz-play/result/result.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "categories",
    component: CategoriesComponent
  },
  {
    path: "quiz",
    component: QuizComponent
  },
  {
    path: "question",
    component: QuestionComponent
  },
  {
    path: "quizzes/:name",
    component: QuizzesComponent
  },
  {
    path: "myQuizzes",
    component: MyQuizzesComponent
  },
  {
    path: "quizView/:quizId",
    component: QuizViewComponent
  },
  {
    path: "questionView/:questionId",
    component: QuestionViewComponent
  },
  {
    path: "quizPlay/:quizId",
    component: QuizPlayComponent
  },
  {
    path: "quizSolve",
    component: QuizSolveComponent
  },
  {
    path: "admin",
    component: AdminComponent
  },
  {
    path: "result",
    component: ResultComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
