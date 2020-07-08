import {Type} from "./type";
import {Answer} from "./answer";
import {AnswerConnect} from "./answer-connect";

export interface Question {
  id: number;
  text: string;
  type: Type;
  quizId: string;
  answers: Answer[];
  answersConnect: AnswerConnect[];
}
