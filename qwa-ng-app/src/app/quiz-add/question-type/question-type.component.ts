import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-question-type',
  templateUrl: './question-type.component.html',
  styleUrls: ['./question-type.component.css']
})
export class QuestionTypeComponent implements OnInit {

  choice = new EventEmitter();


  types = [
    {id: "1", name: "Zwykłe", description: "Zwykle pytanie zawierajce kilka poprawnych odpowiedzi"},
    {id: "2", name: "Połącz", description: "Pytanie w którym należy połączyc obie strony"},
    {id: "3", name: "Wypelnij", description: "Pytanie w którym należy uzupełnić tekst"},
  ];


  constructor() { }

  ngOnInit() {
  }

  typeChosen(id) {
    this.choice.emit(id);
  }

}
