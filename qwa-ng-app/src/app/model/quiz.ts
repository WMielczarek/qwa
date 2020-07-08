import {Question} from "./question";
import {Category} from "./category";

export interface Quiz {
  id: string;
  name: string;
  text: string;
  solvedTimes: string;
  rating: number;
  difficultRate: number;
  category: Category;
  questions : Question[];

}
