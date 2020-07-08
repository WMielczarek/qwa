import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../model/category";
import {Quiz} from "../model/quiz";
import {Question} from "../model/question";
import {Answer} from "../model/answer";
import {AnswerConnect} from "../model/answer-connect";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = "http://localhost:8080/api";
  private ALL_CATEGORIES_URL = `${this.BASE_URL}/category/all`;
  private GET_QUIZZES_FOR_CATEGORY = `${this.BASE_URL}/quiz/find/category/`;
  private ADD_NEW_QUIZ = `${this.BASE_URL}/quiz/add`;
  private ADD_NEW_QUESTION = `${this.BASE_URL}/question/add`;
  private ADD_NEW_ANSWER = `${this.BASE_URL}/answer/add/`;
  private ADD_NEW_ANSWER_CONNECT = `${this.BASE_URL}/answer/add/connect/`;
  private REMOVE_QUESTION = `${this.BASE_URL}/question/delete/`;
  private REMOVE_QUIZ = `${this.BASE_URL}/quiz/delete/`;
  private FIND_QUIZZES_BY_USER = `${this.BASE_URL}/quiz/findAllForUser/`;
  private FIND_QUIZ_BY_ID = `${this.BASE_URL}/quiz/find/`;
  private FIND_QUESTION_BY_ID = `${this.BASE_URL}/question/find/`;
  private UPDATE_ANSWER = `${this.BASE_URL}/answer/`;
  private REMOVE_ANSWER = `${this.BASE_URL}/answer/`;
  private ADD_NEW_CATEGORY = `${this.BASE_URL}/category/add`;
  private CHECK_RESPONSE_STANDARD =  `${this.BASE_URL}/question/checkResponseStandard/`;
  private CHECK_RESPONSE_CONNECT =  `${this.BASE_URL}/question/checkResponseConnect/`;
  private CHECK_RESPONSE_FILL =  `${this.BASE_URL}/question/checkResponseFill/`;

  constructor(private http: HttpClient) {
  }

  responseFill(questionId: number, response: Array<AnswerConnect>) : Observable<boolean> {
    return this.http.post<boolean>(this.CHECK_RESPONSE_FILL + questionId, response);
  }

  responseConnect(questionId: number, response: Array<AnswerConnect>) : Observable<boolean> {
    return this.http.post<boolean>(this.CHECK_RESPONSE_CONNECT + questionId, response);
  }

  responseStandard(questionId : number, response : Array<Answer>) : Observable<boolean> {
    return this.http.post<boolean>(this.CHECK_RESPONSE_STANDARD + questionId, response);
  }

  addNewCategory(category : Category) {
    return this.http.post(this.ADD_NEW_CATEGORY, category);
  }

  removeAnswer(answerId : number) {
    return this.http.delete(this.REMOVE_ANSWER + answerId);
  }

  updateAnswer(answer: Answer, answerId : number) : Observable<Answer> {
    return this.http.post<Answer>(this.UPDATE_ANSWER + answerId, answer);
  }

  getQuestionById(questionId : number) : Observable<Question> {
    return this.http.get<Question>(this.FIND_QUESTION_BY_ID + questionId);
  }

  getQuizById(quizId : number) : Observable<Quiz> {
    return this.http.get<Quiz>(this.FIND_QUIZ_BY_ID + quizId);
  }

  getFindQuizzesByUser() : Observable<Quiz[]> {
    return this.http.get<[]>(this.FIND_QUIZZES_BY_USER);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.ALL_CATEGORIES_URL);
  }

  getAllQuizzesForCategory(categoryName: string) {
    return this.http.get<[]>(this.GET_QUIZZES_FOR_CATEGORY + categoryName);
  }

  addNewQuiz(newQuiz : Quiz) {
    return this.http.post(this.ADD_NEW_QUIZ, newQuiz);
  }

  addNewQuestion(newQuestion:Question) {
    return this.http.post(this.ADD_NEW_QUESTION, newQuestion);
  }

  addNewAnswer(newAnswer: Answer, questionId: number) {
    return this.http.post(this.ADD_NEW_ANSWER + questionId, newAnswer);
  }

  addNewConnectAnswer(newAnswer , questionId : number) {
    return this.http.post(this.ADD_NEW_ANSWER_CONNECT + questionId, newAnswer)
  }

  removeQuestion(questionId : number) {
    return this.http.delete(this.REMOVE_QUESTION + questionId);
  }

  removeQuiz(quizId : number) {
    return this.http.delete(this.REMOVE_QUIZ + quizId);
  }
}
